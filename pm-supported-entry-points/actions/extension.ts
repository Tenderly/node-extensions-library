import { ActionFn, Context, Event } from '@tenderly/actions';
import { ethers } from 'ethers';

export const pmSupportedEntryPoints: ActionFn = async (context: Context, event: Event) => {
  // Getting the chain from the extension event
  const chain = context.metadata.getNetwork();

  // Getting the Pimlico API key from the Web3 Action Secrets
  const PIMLICO_API_KEY = await context.secrets.get('PIMLICO_API_KEY');

  // Creating the Pimlico endpoint
  const PIMLICO_ENDPOINT = `https://api.pimlico.io/v1/${chain}/rpc?apikey=${PIMLICO_API_KEY}`;

  // Creating a new provider using the Pimlico endpoint
  const provider = new ethers.providers.JsonRpcProvider(PIMLICO_ENDPOINT);

  // Sending the pm_supportedEntryPoints request
  const response = await provider.send('pm_supportedEntryPoints', []);
  console.log({ response });

  return response;
};
