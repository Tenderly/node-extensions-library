# PM Sponsor User Operation Node Extension

Pimlico's verifying paymasters allows you to sponsor User Operations on-chain with our paymaster contract. We then
deduct from your Pimlico balance off-chain.

To use this endpoint, you must have an API key with [Pimlico](https://pimlico.io).

User Operations sponsored using `pm_sponsorUserOperation` have a 10-minute time window during which they must be included.
After this time window elapses, all unused gas will be refunded to your Pimlico balance.

This time limit is necessary in order to avoid DoS attacks, as leaving an infinite time window would allow potential
attackers to accumulate User Operations and drain Pimlico's paymaster all in one go, requiring us to maintain enough
balance to cover all possible User Operations we ever signed up to sponsor in the entire history of the paymaster.

If you require a longer time window for your User Operations, please contact us at kristof@pimlico.io
or [@kristofgazso](https://t.me/kristofgazso) on Telegram to sign up.

More info can be found here: https://docs.pimlico.io/reference/pm_sponsoruseroperation.

## Installation

Go to the Extensions Library and search for "pmSponsorUserOperation". Click on the extension and click
"Activate".

## Usage

Go to JSON-RPC Request Builder and select "PM Sponsor User Operation" from the dropdown menu. You can then enter the JSON payload and click "Send Request".

## Method

### **extension_pmSponsorUserOperation**

### Request

Parameters:

- `userOperation`: A User Operation struct that contains information about the action to be executed through a smart contract account. It has the following fields:
  - `sender`: The address of the sender smart contract account.
  - `nonce`: The nonce of the sender smart contract account.
  - `initCode`: The init code of the sender smart contract account.
  - `callData`: The data to be sent to the sender smart contract account during execution.
  - `callGasLimit`: The gas limit for the execution of the callData.
  - `verificationGasLimit`: The gas limit for verifying the signature and nonce of the User Operation.
  - `preVerificationGas`: The gas limit for any operations before verifying the signature and nonce of the User Operation.
  - `maxFeePerGas`: The maximum fee per gas unit that can be paid by this User Operation.
  - `maxPriorityFeePerGas`: The maximum priority fee per gas unit that can be paid by this User Operation.
  - `paymasterAndData`: The address of the paymaster smart contract account that will sponsor this User Operation as well as any additional data required by the paymaster smart contract. This must be left blank, as this is what the wallet operator will have to fill out with the result of this call for the User Operation to be sponsored.
  - `signature`: The signature of this User Operation by its signer. This should be left blank, as the User Operation will have to re-signed anyway after a change of the paymasterAndData field.
- `entryPoint`: The EntryPoint contract address the User Operation is being submitted to.

Example:
```json
{
  "jsonrpc": "2.0",
  "method": "pm_sponsorUserOperation",
  "params": [
    {
      "sender": "0x1234567890123456789012345678901234567890",
      "nonce": "0x1",
      "initCode": "0x",
      "callData": "0x",
      "callGasLimit": "0x100000",
      "verificationGasLimit": "0x20000",
      "preVerificationGas": "0x10000",
      "maxFeePerGas": "0x3b9aca00",
      "maxPriorityFeePerGas": "0x3b9aca00",
      "paymasterAndData": "0x",
      "signature": "0x"
    },
    {
      "entryPoint": "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789"
    }
  ],
  "id": "1"
}
```

### Response

A JSON-RPC response object with a single member:
 - `paymasterAndData`: A hex string that represents an array of bytes. If this User Operation cannot be sponsored, it returns an empty string.

Example:
```json
{
  "jsonrpc": "2.0",
  "result": {
    "paymasterAndData": "0x0e3439e8f1c17d8d2baa7338a880a1dc8b4951530000000000000000000000000000000000000000000000000000000064a1ac1b0000000000000000000000000000000000000000000000000000000000000000add1d309057170d3d7ae2bf48b0596796b62e59d2a157a8469b9ce73bf176e682f9636b6e14aecb7ea5caf9c9a91ac0894cba66c027b98f1e934601f4938ef781b"
  },
  "id": "1"
}
```
