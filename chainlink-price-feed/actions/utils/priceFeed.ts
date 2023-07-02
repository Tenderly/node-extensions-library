import { Chain, ChainMetadata, ChainNetwork } from '../types';
import { Network } from '@tenderly/actions';
import { isValidNetwork } from './networkHelper';
import { INVALID_COIN_PAIR_MESSAGE, INVALID_NETWORK_MESSAGE } from '../constants/constants';

// ChainLink price feeds
import feedsEthereumMainnet from '../data/feeds-ethereum-mainnet.json';
import feedsEthereumSepolia from '../data/feeds-ethereum-testnet-sepolia.json';
import feedsEthereumGoerli from '../data/feeds-ethereum-testnet-goerli.json';
import feedsMaticMainnet from '../data/feeds-matic-mainnet.json';
import feedsMaticTestnet from '../data/feeds-matic-testnet.json';

// Check if both parts are non-empty and consist only of uppercase letters
const isValidCoin = (coin: string) => /^[0-9A-Z]+$/.test(coin);

const isValidCoinPair = (input: string): boolean => {
  // Remove extra spaces from the input and split it by the '/'
  const splitInput = input.trim().split('/').map(part => part.trim());

  // Check if the input has exactly two parts (e.g., BTC and USD)
  if (splitInput.length !== 2) {
    return false;
  }

  // Extract the parts into separate variables
  const [firstCoin, secondCoin] = splitInput;

  return isValidCoin(firstCoin) && isValidCoin(secondCoin);
};

const getPriceFeedByNetwork = (network?: Network): ChainMetadata[] => {
  if (!isValidNetwork(network)) {
    throw new Error(INVALID_NETWORK_MESSAGE);
  }

  switch (network) {
    case Network.MAINNET:
      // @ts-ignore
      return feedsEthereumMainnet;
    case Network.SEPOLIA:
      // @ts-ignore
      return feedsEthereumSepolia;
    case Network.GOERLI:
      // @ts-ignore
      return feedsEthereumGoerli;
    case Network.POLYGON:
      // @ts-ignore
      return feedsMaticMainnet;
    case Network.MUMBAI:
      // @ts-ignore
      return feedsMaticTestnet;
    default:
      return [];
  }
};

const getContractAddressFromCoinPair = (coinPair: string, network?: Network): string | null => {
  if (!isValidNetwork(network)) {
    throw new Error(INVALID_NETWORK_MESSAGE);
  }

  if (!isValidCoinPair(coinPair)) {
    throw new Error(INVALID_COIN_PAIR_MESSAGE);
  }

  // Remove extra spaces from the input and split it by the '/'
  const [firstCoin, secondCoin] = coinPair.trim().split('/').map(part => part.trim());
  const coinPairKey = `${firstCoin} / ${secondCoin}`;
  const priceFeed: ChainMetadata[] = getPriceFeedByNetwork(network);

  return priceFeed.find((feed: ChainMetadata) => feed.name === coinPairKey)?.proxyAddress || null;
};

const getFeedsMetadata = (url: string): Promise<ChainMetadata[]> => {
  return fetch(url).then((res) => res.json());
};

const getChainMetadata = async (chain: Chain): Promise<ChainMetadata | any> => {
  const requests = chain.networks.map((network: ChainNetwork) =>
    network?.rddUrl
      ? getFeedsMetadata(network?.rddUrl).then((metadata) => ({
        ...network,
        metadata: metadata.filter((meta) => meta.docs?.hidden !== true),
      }))
      : undefined,
  );
  const networks = await Promise.all(requests);

  return { ...chain, networks };
};

export {
  getFeedsMetadata,
  getChainMetadata,
  isValidCoinPair,
  getContractAddressFromCoinPair,
  getPriceFeedByNetwork,
};
