import { Network } from '@tenderly/actions';

const isValidNetwork = (network?: Network): boolean => {
  if (!network) {
    return false;
  }

  return (
    network === Network.POLYGON ||
    network === Network.MUMBAI
  );
};

export {
  isValidNetwork,
};
