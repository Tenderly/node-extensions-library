import { ActionFn, Context, Event, ExtensionEvent, Network } from '@tenderly/actions';
import { ethers } from 'ethers';
import { isValidNetwork } from './utils/networkHelper';

export const example: ActionFn = async (context: Context, event: Event) => {
  // Casting the event to a ExtensionEvent
  const params: ExtensionEvent = event as ExtensionEvent;

  // Getting the block hash from the node extension event payload
  const [blockHashOrBlockTag] = params;

  // Get the network from the request metadata
  const network: Network | undefined = context.metadata.getNetwork();

  // Checking if the network is valid
  if (!isValidNetwork(network)) {
    throw new Error('Invalid network. Check supported networks by Web3 Gateway.');
  }

  // Getting the default gateway URL
  const defaultGatewayURL: string = context.gateways.getGateway();

  // Creating a new provider using the default gateway URL
  const provider: ethers.providers.JsonRpcProvider = new ethers.providers.JsonRpcProvider(defaultGatewayURL);

  // Calling the getBlock method on the provider to get the block data
  const response: ethers.providers.Block = await provider.getBlock(blockHashOrBlockTag);
  console.log({ block: response });

  return response;
};
