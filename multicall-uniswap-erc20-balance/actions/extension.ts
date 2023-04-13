import {ActionFn, Context, Event, ExtensionEvent} from '@tenderly/actions';
import { ethers } from 'ethers';
const { bytecode } = require('./artifacts/solidity/contracts/BatchRequest.sol/BatchRequest.json');

const FACTORY = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f"; // Pairs deployed: 10000835
const abi = ["function allPairsLength() external view returns (uint)"];

export const multicallUniswapERC20Balance: ActionFn = async (context: Context, event: Event) => {
  // Casting the event to a ExtensionEvent
  const params: ExtensionEvent = event as ExtensionEvent;

  // Setting a variable that will store the Web3 Gateway RPC URL and secret key
  const defaultGatewayURL = context.gateways.getGateway();

  // Using the Ethers.js provider class to call the RPC URL
  const provider = new ethers.providers.JsonRpcProvider(defaultGatewayURL);

  // Getting the input data from the webhook event
  const [ offsetHex, limitHex ] = params;
  const offset = parseInt(offsetHex)
  const limit = parseInt(limitHex)

  const step = 200;
  const factory = new ethers.Contract(FACTORY, abi, provider);
  const pairsLength = await factory.allPairsLength();

  if (limit > 1000) {
    return Promise.reject({
      error: 'limit exceeds maximum value of 1000',
    });
  }

  if ((offset + limit) > pairsLength) {
    return Promise.reject({
      error: 'offset + limit exceeds number of pairs length',
    });
  }

  const values = []

  // Iterate by batches
  for (let i = offset; i < offset + limit; i += step) {
    // Get the bytecode and append the consturctor args
    let inputData = ethers.utils.defaultAbiCoder.encode(
        ["uint256", "uint256", "address"],
        [i, step, FACTORY]
    );

    const payload = bytecode.concat(inputData.slice(2));

    // Call the deployment transaction
    const returnedData = await provider.call({ data: payload });

    // Abi decode the array
    const [decoded] = ethers.utils.defaultAbiCoder.decode(
        ["uint256[]"],
        returnedData
    );

    // add balances to the array
    for (let j = 0; j < decoded.length; j++) {
      values.push(decoded[j]._hex)
    }
  }

  return values;
};

