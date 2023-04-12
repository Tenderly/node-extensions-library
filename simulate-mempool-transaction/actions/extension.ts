import {ActionFn, Context, Event, ExtensionEvent} from '@tenderly/actions';
import {ethers} from 'ethers';

export const simulateMempoolTransaction: ActionFn = async (context: Context, event: Event) => {
    // Casting the event to a WebhookEvent
    const params: ExtensionEvent = event as ExtensionEvent;

    // Setting a variable that will store the Web3 Gateway RPC URL and secret key
    const defaultGatewayURL = context.gateways.getGateway();

    // Using the Ethers.js provider class to call the RPC URL
    const provider = new ethers.providers.JsonRpcProvider(defaultGatewayURL);

    const txHash = params[0];

    const tx = await provider.send("eth_getTransactionByHash", [txHash])
    // if transaction is not found, return error
    if (tx == null) {
        return Promise.reject({
            error: 'Transaction not found',
        });
    }
    // if transaction is alrady mined, return error
    if (tx.blockNumber != null) {
        return Promise.reject({
            error: 'Transaction mined',
        });
    }

    // Creating a new transaction object with the parsed transaction
    // in order to support the tenderly_simulateTransaction RPC call
    const parsedTransaction = {
        from: tx.from,
        to: tx.to,
        gas: tx.gasLimit?._hex,
        gasPrice: tx.gasPrice?._hex,
        value: tx.value?._hex,
        data: tx.data,
    };

    // Simulate mempool transaction to get execution results
    return await provider.send('tenderly_simulateTransaction', [parsedTransaction, 'latest']);
};
