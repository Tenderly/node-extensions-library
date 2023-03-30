import { Network } from '@tenderly/actions';

const isValidNetwork = (network: Network): boolean => {
  if (!network) {
    return false;
  }

  return (
    network === Network.MAINNET ||
    network === Network.GOERLI ||
    network === Network.SEPOLIA
  );
};

export { isValidNetwork };
