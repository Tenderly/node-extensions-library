import { ActionFn, Context, Event, ExtensionEvent, Network } from '@tenderly/actions';
import { ethers } from 'ethers';
import { isValidNetwork } from './utils/networkHelper';
import { getContractAddressFromCoinPair, isValidCoinPair } from './utils/priceFeed';
import { INVALID_COIN_PAIR_MESSAGE, INVALID_NETWORK_MESSAGE } from './constants/constants';
import aggregatorV3InterfaceABI from './abi/aggregatorV3InterfaceABI.json';

export const chainlinkPriceFeed: ActionFn = async (context: Context, event: Event) => {
  // Casting the event to a ExtensionEvent
  const params: ExtensionEvent = event as ExtensionEvent;

  // Getting the coin pair and network from the webhook event payload
  const [coinPair] = params;

  // Get the network from the request metadata
  const network: Network | undefined = context.metadata.getNetwork();

  // Checking if the network is valid
  if (!isValidNetwork(network)) {
    throw new Error(INVALID_NETWORK_MESSAGE);
  }

  // Checking if the coin pair is valid
  if (!isValidCoinPair(coinPair)) {
    throw new Error(INVALID_COIN_PAIR_MESSAGE);
  }

  // Setting a variable that will store the Web3 Gateway RPC URL and secret key
  const defaultGatewayURL: string = context.gateways.getGateway();

  // Using the Ethers.js provider class to call the RPC URL
  const provider: ethers.providers.JsonRpcProvider = new ethers.providers.JsonRpcProvider(defaultGatewayURL);

  // Getting the contract address from the coin pair
  const contractAddress: string | null = getContractAddressFromCoinPair(coinPair, network);

  if (!contractAddress) {
    throw new Error(`No contract address found for the coin pair ${coinPair} on the ${network} network.`);
  }

  // Create a new contract instance
  const priceFeed: ethers.Contract = new ethers.Contract(contractAddress, aggregatorV3InterfaceABI, provider);

  // Get the latest round data
  const {
    roundId,
    answer,
    startedAt,
    updatedAt,
    answeredInRound,
  } = await priceFeed.latestRoundData();

  // Print the values.
  // They can be seen in the Web3 Action execution logs.
  console.log({
    roundId,
    answer,
    startedAt,
    updatedAt,
    answeredInRound,
  });

  return {
    roundId,
    answer,
    startedAt,
    updatedAt,
    answeredInRound,
  };
};
