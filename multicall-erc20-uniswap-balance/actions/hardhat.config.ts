import '@nomiclabs/hardhat-ethers';
import 'dotenv/config';
import 'hardhat-deploy';
import 'tsconfig-paths/register';
// import { removeConsoleLog } from 'hardhat-preprocessor';
import { HardhatUserConfig } from 'hardhat/types';

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  // mocha: {
  //   timeout: process.env.MOCHA_TIMEOUT || 300000,
  // },
  // networks,
  solidity: {
    compilers: [
      {
        version: '0.8.16',
        settings: {
          optimizer: {
            enabled: false,
            runs: 200,
          },
        },
      },
    ],
  },
  // gasReporter: {
  //   currency: process.env.COINMARKETCAP_DEFAULT_CURRENCY,
  //   coinmarketcap: process.env.COINMARKETCAP_API_KEY,
  //   showMethodSig: true,
  //   onlyCalledMethods: false,
  // },
  // preprocess: {
  //   eachLine: removeConsoleLog((hre) => hre.network.name !== 'hardhat'),
  // },
  // etherscan: {
  //   apiKey: env.getEtherscanAPIKeys(['ethereum']),
  // },
  // typechain: {
  //   outDir: 'typechained',
  //   target: 'ethers-v5',
  // },
  paths: {
    sources: './solidity',
  },
};

export default config;
