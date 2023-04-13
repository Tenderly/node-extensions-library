import { ActionFn, Context, Event, ExtensionEvent } from '@tenderly/actions';
import { ethers } from 'ethers';

export const example: ActionFn = async (context: Context, event: Event) => {
  // Casting the event to a ExtensionEvent
  const extensionEvent: ExtensionEvent = event as ExtensionEvent;

  // Getting the default gateway URL
  const defaultGatewayURL = context.gateways.getGateway();

  // Creating a new provider using the default gateway URL
  const provider = new ethers.providers.JsonRpcProvider(defaultGatewayURL);

  // Getting the block number from the node extension event payload
  const [blockNumber] = extensionEvent;

  // Calling the getBlock method on the provider to get the block data
  const response = await provider.getBlock(blockNumber);
  console.log({ blockNumber: response });

  return response;
};
