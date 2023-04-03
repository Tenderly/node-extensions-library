import { ActionFn, Context, Event, Network, WebhookEvent } from '@tenderly/actions';
import { ethers } from 'ethers';

export const example: ActionFn = async (context: Context, event: Event) => {
  // Casting the event to a WebhookEvent
  const webhookEvent: WebhookEvent = event as WebhookEvent;

  // Getting the default gateway URL for the mainnet
  const defaultGatewayURL = context.gateways.getGateway(Network.MAINNET);

  // Creating a new provider using the default gateway URL
  const provider = new ethers.providers.JsonRpcProvider(defaultGatewayURL);

  // Getting the block number from the webhook event payload
  const { blockNumber } = webhookEvent.payload;

  // Calling the getBlock method on the provider to get the block data
  const response = await provider.getBlock(blockNumber);
  console.log({ blockNumber: response });

  return response;
};
