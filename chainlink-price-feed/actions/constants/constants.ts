import { Chain } from '../types';

const CHAINS: Chain[] = [
  // Ethereum
  {
    page: 'ethereum',
    title: 'Data Feeds',
    img: '/assets/chains/ethereum.svg',
    networkStatusUrl: 'https://ethstats.dev/',
    tags: ['default', 'proofOfReserve', 'nftFloorPrice'],
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
      },
      {
        name: 'Goerli Testnet',
        explorerUrl: 'https://goerli.etherscan.io/address/%s',
        networkType: 'testnet',
        tags: ['proofOfReserve', 'nftFloorPrice'],
        rddUrl: 'https://reference-data-directory.vercel.app/feeds-goerli.json',
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
    tags: ['default', 'proofOfReserve'],
    networks: [
      {
        name: 'Polygon Mainnet',
        explorerUrl: 'https://polygonscan.com/address/%s',
        networkType: 'mainnet',
        tags: ['proofOfReserve'],
        rddUrl: 'https://reference-data-directory.vercel.app/feeds-matic-mainnet.json',
      },
      {
        name: 'Mumbai Testnet',
        explorerUrl: 'https://mumbai.polygonscan.com/address/%s',
        networkType: 'testnet',
        rddUrl: 'https://reference-data-directory.vercel.app/feeds-matic-testnet.json',
      },
    ],
  },
];

export {
  CHAINS,
};
