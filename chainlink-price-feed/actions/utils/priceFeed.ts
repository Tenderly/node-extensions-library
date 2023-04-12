import { Chain, ChainMetadata, ChainNetwork } from '../types';
import { Network } from '@tenderly/actions';
import { isValidNetwork } from './networkHelper';

import feedsMainnet from '../data/feeds-ethereum-mainnet.json';
import feedsSepolia from '../data/feeds-ethereum-testnet-sepolia.json';
import feedsGoerli from '../data/feeds-ethereum-testnet-goerli.json';

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
    throw new Error('Invalid network. Supported networks are Ethereum Mainnet, Sepolia Testnet & Goerli Testnet');
  }

  if (network === Network.MAINNET) {
    // @ts-ignore
    return feedsMainnet;
  }

  if (network === Network.SEPOLIA) {
    // @ts-ignore
    return feedsSepolia;
  }

  if (network === Network.GOERLI) {
    // @ts-ignore
    return feedsGoerli;
  }

  return [];
};

const getContractAddressFromCoinPair = (coinPair: string, network?: Network): string | null => {
  if (!isValidNetwork(network)) {
    throw new Error('Invalid network. Supported networks are Ethereum Mainnet, Sepolia Testnet & Goerli Testnet');
  }

  if (!isValidCoinPair(coinPair)) {
    throw new Error('Invalid coin pair. The coin pair should be in the format of coin1/coin2, e.g. BTC/USD.');
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
