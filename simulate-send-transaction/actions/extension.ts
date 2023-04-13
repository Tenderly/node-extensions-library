import {ActionFn, Context, Event, ExtensionEvent} from '@tenderly/actions';
import {BigNumber, ethers} from 'ethers';

export const sendRawTransaction: ActionFn = async (context: Context, event: Event) => {
  // Casting the event to a ExtensionEvent
  const params: ExtensionEvent = event as ExtensionEvent;

  // Setting a variable that will store the Web3 Gateway RPC URL and secret key
  const defaultGatewayURL = context.gateways.getGateway();

  // Using the Ethers.js provider class to call the RPC URL
  const provider = new ethers.providers.JsonRpcProvider(defaultGatewayURL);

  // Getting the raw transaction payload from the webhook event
  const signedTx = params[0];

  // Parsing the transaction payload
  const tx = ethers.utils.parseTransaction(signedTx);

  // Creating a new transaction object with the parsed transaction
  // in order to support the tenderly_simulateTransaction RPC call
  const txPayload = {
    from: tx.from,
    to: tx.to,
    gas: hexValue(tx.gasLimit?._hex),
    gasPrice: hexValue(tx.gasPrice),
    value: hexValue(tx.value?._hex),
    data: tx.data,
  };

  // Simulate transaction to get execution results
  const simulationResponse = await provider.send('tenderly_simulateTransaction', [txPayload, 'latest']);

  // If simulation fails, return error
  if (simulationResponse.status === false) {
    throw new Error(`simulation failed`);
  }

  // If simulation succeeds, send the transaction
  return provider.send('eth_sendRawTransaction', params);
};

const hexValue = (hex? : BigNumber | string): string | undefined => {
  if (hex == undefined) return undefined

  return ethers.utils.hexValue(hex)
}
