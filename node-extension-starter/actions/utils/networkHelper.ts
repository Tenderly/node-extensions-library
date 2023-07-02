import { Network } from '@tenderly/actions';

const isValidNetwork = (network?: Network): boolean => {
  if (!network) {
    return false;
  }

  return (
    network === Network.MAINNET ||
    network === Network.GOERLI ||
    network === Network.SEPOLIA ||
    network === Network.POLYGON ||
    network === Network.MUMBAI ||
    network === Network.BOBA_ETHEREUM ||
    network === Network.BOBA_BINANCE ||
    network === Network.BOBA_BINANCE_RIALTO
  );
};

export { isValidNetwork };
