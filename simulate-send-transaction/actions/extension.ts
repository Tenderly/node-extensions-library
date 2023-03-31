import { ActionFn, Context, Event, Network, WebhookEvent } from '@tenderly/actions';
import { ethers } from 'ethers';

export const sendSimulateRawTransaction: ActionFn = async (context: Context, event: Event) => {
  // Casting the event to a WebhookEvent
  const webhookEvent: WebhookEvent = event as WebhookEvent;

  // Setting a variable that will store the Web3 Gateway RPC URL and secret key
  const defaultGatewayURL = context.gateways.getGateway(Network.MAINNET);

  // Using the Ethers.js provider class to call the RPC URL
  const provider = new ethers.providers.JsonRpcProvider(defaultGatewayURL);

  // Creating a transaction object
  const tx = {
    ...webhookEvent.payload,
    data: webhookEvent.payload.data || webhookEvent.payload.input,
  };

  // Simulate transaction to get execution results
  const simulationResponse = await provider.send('tenderly_simulateTransaction', [
    {
      from: tx.from,
      to: tx.to,
      gas: tx.gas,
      gasPrice: tx.gasPrice,
      value: tx.value,
      data: tx.data,
    },
    'latest',
  ]);
  console.log({ simulationResponse });

  // If simulation fails, return error
  if (simulationResponse.status === false) {
    return Promise.reject({
      error: 'Simulation failed',
      simulationResponse,
    });
  }

  return simulationResponse;
  // Send transaction to the network
  // return provider.send('eth_sendRawTransaction', tx);
};
