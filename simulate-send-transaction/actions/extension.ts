import {ActionFn, Context, Event, Network} from '@tenderly/actions';

import {ethers} from 'ethers';

export const sendSimulateRawTransaction: ActionFn = async (context: Context, event: Event) => {
	// Setting a variable that will store the Web3 Gateway RPC URL and secret key
	const defaultGatewayURL = context.gateways.getGateway(Network.MAINNET);

	// Using the Ethere.js provider class to call the RPC URL
	const provider = new ethers.JsonRpcProvider(defaultGatewayURL);

	// Decode raw transaction
	const tx = ethers.Transaction.from(event)

	// Simulate transaction to get execution results
	const simResponse = await provider.send("tenderly_simulateTransaction", [{
		"from": tx.from,
		"to": tx.to,
		"gas": tx.gasLimit,
		"gasPrice": tx.gasPrice,
		"value": tx.value,
		"data": tx.data,
	}])

	// If simulation fails, return error
	if (simResponse.status == false) {
		return null
	}

	// Send transaction to the network
	return provider.send('eth_sendRawTransaction', event)
}
