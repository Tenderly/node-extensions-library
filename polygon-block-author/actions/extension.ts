import { ActionFn, Context, Event, Network, ExtensionEvent } from '@tenderly/actions';
import { ethers } from 'ethers';
import { hexZeroPad } from 'ethers/lib/utils';
import { isValidNetwork } from './utils/networkHelper';

// Fixed number of extra-data suffix bytes reserved for signer seal
const extraSeal = 130;

// errMissingSignature is returned if a block's extra-data section doesn't seem
// to contain a 65 byte Secp256k1 signature.
const errMissingSignature = 'extra-data 65 byte signature suffix missing';

export const blockAuthor: ActionFn = async (context: Context, event: Event) => {
  // Casting the event to a ExtensionEvent
  const params: ExtensionEvent = event as ExtensionEvent;

  // Getting the block number from the extension event payload
  const [blockNumber] = params;

  // Checking if the block number exists
  if (!blockNumber) {
    throw new Error('Invalid block number.');
  }

  // Get the network from the request metadata
  const network: Network | undefined = context.metadata.getNetwork();

  // Checking if the network is valid
  if (!isValidNetwork(network)) {
    throw new Error(`Network ${network} is not supported. Supported networks: polygon & mumbai.`);
  }

  // Getting the default gateway URL
  const defaultGatewayURL: string = context.gateways.getGateway();

  // Using the Ethers.js provider class to call the RPC URL
  const provider = new ethers.providers.JsonRpcProvider(defaultGatewayURL);

  // Sending the eth_getBlockByNumber request
  const block = await provider.send('eth_getBlockByNumber', [blockNumber, false]);

  // Retrieve the signature from the header extra-data
  if (block.extraData.length < extraSeal) {
    throw new Error(errMissingSignature);
  }

  // Use ECDSA Public Key Recovery to determine the address that signed digest to which generated signature
  const signature = block.extraData.slice(block.extraData.length - extraSeal);
  const hash = await SealHash(block);

  return ethers.utils.recoverAddress(hash, {
    r: '0x' + signature.slice(0, 64),
    s: '0x' + signature.slice(64, 128),
    v: +signature[129] + 27,
  });
};

const SealHash = async (block: any) => {
  const enc = [
    block.parentHash,
    block.sha3Uncles,
    block.miner,
    block.stateRoot,
    block.transactionsRoot,
    block.receiptsRoot,
    block.logsBloom,
    hexZeroPad(block.difficulty, Math.ceil((block.difficulty.length - 2) / 2)),
    hexZeroPad(block.number, Math.ceil((block.number.length - 2) / 2)),
    hexZeroPad(block.gasLimit, Math.ceil((block.gasLimit.length - 2) / 2)),
    hexZeroPad(block.gasUsed, Math.ceil((block.gasUsed.length - 2) / 2)),
    block.timestamp,
    block.extraData.slice(0, block.extraData.length - extraSeal),
    block.mixHash,
    block.nonce,
  ];

  if (block.baseFeePerGas) {
    enc.push(hexZeroPad(block.baseFeePerGas, Math.ceil((block.baseFeePerGas.length - 2) / 2)));
  }

  return ethers.utils.keccak256(ethers.utils.RLP.encode(enc));
};

