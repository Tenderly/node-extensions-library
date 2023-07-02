import { Network } from '@tenderly/actions';

// Networks supported by Tenderly
const isValidNetwork = (network?: Network): boolean => {
  if (!network) {
    return false;
  }

  return (
    network === Network.GOERLI ||
    network === Network.SEPOLIA ||
    network === Network.POLYGON ||
    network === Network.MUMBAI
  );
};

// Pimlico supported chains: https://docs.pimlico.io/reference/verifying-paymaster
const mapTenderlyNetworkToPimlico = (network?: Network): string => {
  switch (network) {
    case Network.MAINNET:
      return 'ethereum';
    case Network.GOERLI:
      return 'goerli';
    case Network.SEPOLIA:
      return 'sepolia';
    case Network.ARBITRUM:
      return 'arbitrum';
    case Network.ARBITRUM_GOERLI:
      return 'arbitrum-goerli';
    case Network.POLYGON:
      return 'polygon';
    case Network.MUMBAI:
      return 'mumbai';
    case Network.OPTIMISTIC:
      return 'optimism';
    case Network.OPTIMISTIC_GOERLI:
      return 'optimism-goerli';
    default:
      return '';
  }
};

export {
  isValidNetwork,
  mapTenderlyNetworkToPimlico,
};
