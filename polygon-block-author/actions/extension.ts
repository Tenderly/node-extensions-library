import {ActionFn, Context, Event, Network, WebhookEvent,} from '@tenderly/actions';
import {ethers} from "ethers";
import {hexZeroPad} from "ethers/lib/utils";

// Fixed number of extra-data suffix bytes reserved for signer seal
const extraSeal = 130

// errMissingSignature is returned if a block's extra-data section doesn't seem
// to contain a 65 byte secp256k1 signature.
const errMissingSignature = "extra-data 65 byte signature suffix missing"

export const blockAuthor: ActionFn = async (context: Context, event: Event) => {
    // Casting the event to a WebhookEvent
    const webhookEvent: WebhookEvent = event as WebhookEvent;

    // Setting a variable that will store the Web3 Gateway RPC URL and secret key
    const network = context.metadata.getNetwork();
    if (network === undefined) {
        return Promise.reject({
            error: 'network not defined',
        });
    }
    if (network != Network.POLYGON && network != Network.MUMBAI) {
        return Promise.reject({
            error: 'network not supported',
        });
    }

    const defaultGatewayURL= context.gateways.getGateway();

    // Using the Ethers.js provider class to call the RPC URL
    const provider = new ethers.providers.JsonRpcProvider(defaultGatewayURL);

    const block = await provider.send("eth_getBlockByNumber", [webhookEvent.payload.data, false])

    // Retrieve the signature from the header extra-data
    if (block.extraData.length < extraSeal) {
        return errMissingSignature
    }

    const signature = block.extraData.slice(block.extraData.length - extraSeal)
    const hash = await SealHash(block)

    return ethers.utils.recoverAddress(hash, {
        r: "0x" + signature.slice(0, 64),
        s: "0x" + signature.slice(64, 128),
        v: signature[129] + 27,
    })
}

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
        enc.push(hexZeroPad(block.baseFeePerGas, Math.ceil((block.baseFeePerGas.length - 2) / 2)))
    }

    return ethers.utils.keccak256(ethers.utils.RLP.encode(enc))
}

