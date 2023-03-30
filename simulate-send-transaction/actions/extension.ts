import { ActionFn, Context, Event, Network, WebhookEvent } from '@tenderly/actions';
import { ethers } from 'ethers';

export const sendSimulateRawTransaction: ActionFn = async (context: Context, event: Event) => {
  // Casting the event to a WebhookEvent
  const webhookEvent: WebhookEvent = event as WebhookEvent;

  // Setting a variable that will store the Web3 Gateway RPC URL and secret key
  const defaultGatewayURL = context.gateways.getGateway(Network.MAINNET);

  // Using the Ethers.js provider class to call the RPC URL
  const provider = new ethers.providers.JsonRpcProvider(defaultGatewayURL);

  // Decode raw transaction
  const tx = {
    ...webhookEvent.payload,
    data: webhookEvent.payload.data || webhookEvent.payload.input,
  };

  // Simulate transaction to get execution results
  const simResponse = await provider.send('tenderly_simulateTransaction', [
    {
      ...tx,
    },
    'latest',
  ]);
  console.log({ simResponse });

  // If simulation fails, return error
  if (simResponse.status == false) {
    return Promise.reject({
      error: 'Simulation failed',
      simResponse,
    });
  }

  return simResponse;
  // Send transaction to the network
  // return provider.send('eth_sendRawTransaction', tx);
};
