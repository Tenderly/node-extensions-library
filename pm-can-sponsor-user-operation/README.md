# PM Can Sponsor User Operation Node Extension

This function checks whether Pimlico's Paymaster service can sponsor a User Operation on behalf of a third-party dapp.

Note: this endpoint will usually return an empty string as a result, as at this stage only a small minority of
transactions have third parties willing to sponsor them. If you are a Dapp and interested in sponsoring User Operations
on behalf of ERC-4337 wallet users, please get in touch!

More info can be found here: https://docs.pimlico.io/reference/pm_cansponsoruseroperation.

## Installation

Go to the Extensions Library and search for "pmCanSponsorUserOperation". Click on the extension and click
"Activate".

## Usage

Go to JSON-RPC Request Builder and select "PM Can Sponsor User Operation" from the dropdown menu. You can then enter the JSON payload and click "Send Request".

## Method

### **extension_pmCanSponsorUserOperation**

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
- `referralAddress`: A 20-byte hex address, likely owned by the wallet operator, that will accrue any referral fees from sponsored User Operations.

Example:
```json
{
  "jsonrpc": "2.0",
  "method": "eth_canSponsorUserOperation",
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
    },
    {
      "referralAddress": "0x2109876543210987654301098765432198765432"
    }
  ],
  "id": "1"
}
```

### Response

A JSON-RPC response object with a single member:
 - `paymasterAndData`: A hex string that represents an array of bytes. It contains information about whether this User Operation can be sponsored by the Paymaster service and any additional data required by the Paymaster service. If this User Operation cannot be sponsored, it returns an empty string.

Example:
```json
{
  "jsonrpc": "2.0",
  "result": {
    "paymasterAndData": "0xbcd12340a2109876543210987654301098765432198765432"
  },
  "id": "1"
}
```
