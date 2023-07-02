import { ActionFn, Context, Event, Network } from '@tenderly/actions';
import { ethers } from 'ethers';
import { isValidNetwork, mapTenderlyNetworkToPimlico } from './utils/networkHelper';

export const pmSupportedEntryPoints: ActionFn = async (context: Context, event: Event) => {
  // Get the network from the request metadata
  const network: Network | undefined = context.metadata.getNetwork();

  // Checking if the network is valid
  if (!isValidNetwork(network)) {
    throw new Error(`Chain ${network} is not supported. Supported chains: goerli, sepolia, polygon & mumbai.`);
  }

  // Getting the Pimlico API key from the secrets
  let PIMLICO_API_KEY: string;

  try {
    PIMLICO_API_KEY = await context.secrets.get('PIMLICO_API_KEY');
  } catch (error) {
    throw new Error('\'PIMLICO_API_KEY\' is not set in the Web3 Action secrets.');
  }

  // Getting the Pimlico chain value from the provided network
  const pimlicoChain: string = mapTenderlyNetworkToPimlico(network);

  // Creating the Pimlico endpoint
  const PIMLICO_ENDPOINT: string = `https://api.pimlico.io/v1/${pimlicoChain}/rpc?apikey=${PIMLICO_API_KEY}`;

  // Creating a new provider using the Pimlico endpoint
  const provider: ethers.providers.JsonRpcProvider = new ethers.providers.JsonRpcProvider(PIMLICO_ENDPOINT);

  // Sending the pm_supportedEntryPoints request
  const response = await provider.send('pm_supportedEntryPoints', []);
  console.log({ response });

  return response;
};
