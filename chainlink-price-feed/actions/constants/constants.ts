import { Chain } from '../types';

const INVALID_COIN_PAIR_MESSAGE: string = 'Invalid coin pair. The coin pair should be in the format of coin1/coin2, e.g. BTC/USD.';
const INVALID_NETWORK_MESSAGE: string = 'Invalid network. Supported networks are Ethereum Mainnet, Sepolia Testnet, Goerli Testnet, Polygon Mainnet & Polygon Mumbai.';

const CHAINS: Chain[] = [
  // Ethereum
  {
    page: 'ethereum',
    title: 'Data Feeds',
    img: '/assets/chains/ethereum.svg',
    networkStatusUrl: 'https://ethstats.dev/',
    tags: ['default', 'proofOfReserve', 'nftFloorPrice', 'rates'],
    networks: [
      {
        name: 'Ethereum Mainnet',
        explorerUrl: 'https://etherscan.io/address/%s',
        networkType: 'mainnet',
        rddUrl: 'https://reference-data-directory.vercel.app/feeds-mainnet.json',
        tags: ['proofOfReserve', 'nftFloorPrice'],
      },
      {
        name: 'Sepolia Testnet',
        explorerUrl: 'https://sepolia.etherscan.io/address/%s',
        networkType: 'testnet',
        rddUrl: 'https://reference-data-directory.vercel.app/feeds-ethereum-testnet-sepolia.json',
        tags: ['rates'],
      },
      {
        name: 'Goerli Testnet',
        explorerUrl: 'https://goerli.etherscan.io/address/%s',
        networkType: 'testnet',
        rddUrl: 'https://reference-data-directory.vercel.app/feeds-goerli.json',
        tags: ['proofOfReserve', 'nftFloorPrice'],
      },
    ],
    label: 'Ethereum',
  },
  // Polygon
  {
    page: 'polygon',
    title: 'Polygon (Matic) Data Feeds',
    label: 'Polygon (Matic)',
    img: '/assets/chains/polygon.svg',
    networkStatusUrl: 'https://polygon.io/system',
    tags: ['default', 'proofOfReserve', 'nftFloorPrice', 'rates'],
    networks: [
      {
        name: 'Polygon Mainnet',
        explorerUrl: 'https://polygonscan.com/address/%s',
        networkType: 'mainnet',
        rddUrl: 'https://reference-data-directory.vercel.app/feeds-matic-mainnet.json',
        tags: ['proofOfReserve'],
      },
      {
        name: 'Mumbai Testnet',
        explorerUrl: 'https://mumbai.polygonscan.com/address/%s',
        networkType: 'testnet',
        rddUrl: 'https://reference-data-directory.vercel.app/feeds-matic-testnet.json',
        tags: ['nftFloorPrice', 'rates'],
      },
    ],
  },
];

export {
  CHAINS,
  INVALID_COIN_PAIR_MESSAGE,
  INVALID_NETWORK_MESSAGE,
};
