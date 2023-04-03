# PM Sponsor User Operation Node Extension

This function asks Pimlico's paymaster to sponsor the submitted User Operation on behalf of the wallet.

To use this endpoint, the wallet must have a plan with us. Please contact us at kristof@pimlico.io or @kristofgazso on telegram to sign up.

Note: This function does not check whether the User Operation is will be valid when called on-chain, and will sign anything that is well formed.

## Installation

More info https://docs.pimlico.io/docs/wallets/api#pm_sponsoruseroperation.

## Usage

TODO

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

```json
{
  "jsonrpc": "2.0",
  "method": "pm_sponsorUserOperation",
  "params": [
    {
      "sender": "0x1234567890123456789012345678901234567890",
      "nonce": "0x1",
      "initCode": "",
      "callData": "",
      "callGasLimit": "0x100000",
      "verificationGasLimit": "0x20000",
      "preVerificationGas": "0x10000",
      "maxFeePerGas": "0x3b9aca00",
      "maxPriorityFeePerGas": "0x3b9aca00",
      "paymasterAndData": "",
      "signature": ""
    },
    {
      "entryPoint": "0x0987654321098765432109876543210987654321"
    }
  ],
  "id": "1"
}
```

### Response

A JSON-RPC response object with a single member:
 - `paymasterAndData`: A hex string that represents an array of bytes. If this User Operation cannot be sponsored, it returns an empty string.

```json
{
  "jsonrpc": "2.0",
  "result": {
    "paymasterAndData": "0xbcd12340a2109876543210987654301098765432198765432"
  },
  "id": "1"
}
```
