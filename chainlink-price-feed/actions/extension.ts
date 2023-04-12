import { ActionFn, Context, Event, WebhookEvent } from '@tenderly/actions';
import { ethers } from 'ethers';
import { isValidNetwork } from './utils/networkHelper';
import { getContractAddressFromCoinPair, isValidCoinPair } from './utils/priceFeed';
import aggregatorV3InterfaceABI from './abi/aggregatorV3InterfaceABI.json';

export const chainlinkPriceFeed: ActionFn = async (context: Context, event: Event) => {
  // Casting the event to a WebhookEvent
  const webhookEvent: WebhookEvent = event as WebhookEvent;

  // Getting the coin pair and network from the webhook event payload
  const { coinPair, network } = webhookEvent.payload;

  // Checking if the network is valid
  if (!isValidNetwork(network)) {
    throw new Error('Invalid network. Supported networks are Ethereum Mainnet, Sepolia Testnet & Goerli Testnet');
  }

  // Checking if the coin pair is valid
  if (!isValidCoinPair(coinPair)) {
    throw new Error('Invalid coin pair. The coin pair should be in the format of coin1/coin2, e.g. BTC/USD.');
  }

  // Setting a variable that will store the Web3 Gateway RPC URL and secret key
  const defaultGatewayURL = context.gateways.getGateway(network);

  // Using the Ethers.js provider class to call the RPC URL
  const provider = new ethers.providers.JsonRpcProvider(defaultGatewayURL);

  // Getting the contract address from the coin pair
  const contractAddress = getContractAddressFromCoinPair(coinPair, network);

  if (!contractAddress) {
    throw new Error(`No contract address found for the coin pair ${coinPair} on the ${network} network.`);
  }

  // Create a new contract instance
  const priceFeed = new ethers.Contract(contractAddress, aggregatorV3InterfaceABI, provider);

  // Get the latest round data
  const roundData = await priceFeed.latestRoundData();
  console.log(roundData);

  return { data: roundData };
};
