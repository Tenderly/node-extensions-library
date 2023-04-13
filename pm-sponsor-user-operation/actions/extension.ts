import {ActionFn, Context, Event, ExtensionEvent, Network} from '@tenderly/actions';
import { ethers } from 'ethers';

export const pmSponsorUserOperation: ActionFn = async (context: Context, event: Event) => {
  const chain = context.metadata.getNetwork();

  if (chain != Network.GOERLI) {
    throw new Error(`Chain ${chain} not supported, supported chains: goerli`);
  }

  // Casting the event to a ExtensionEvent
  const params: ExtensionEvent = event as ExtensionEvent;

  // Getting the block number from the webhook event payload
  const [userOperation, entryPoint ] = params;

  // Getting the Pimlico API key from the secrets
  const PIMLICO_API_KEY = await context.secrets.get('PIMLICO_API_KEY');

  if (!PIMLICO_API_KEY) {
    return {
      error_message: 'PIMLICO_API_KEY is not set in the secrets',
    };
  }

  // Creating the Pimlico endpoint
  const PIMLICO_ENDPOINT = `https://api.pimlico.io/v1/${chain}/rpc?apikey=${PIMLICO_API_KEY}`;

  // Creating a new provider using the Pimlico endpoint
  const provider = new ethers.providers.JsonRpcProvider(PIMLICO_ENDPOINT);

  // Sending the pm_sponsorUserOperation request
  const response = await provider.send('pm_sponsorUserOperation', [
    userOperation,
    { entryPoint },
  ]);
  console.log({ response });

  return response;
};
