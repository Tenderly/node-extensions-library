# Simulate Send Transaction Node Extension

This extension sends signed transaction to the network after it ensures that the simulation of the transaction is successful. This serves as a safety net, preventing you to submit transaction that will likely fail.

## Installation

Go to the Extensions Library and search for "Simulate Send Transaction". Click on the extension and click "Activate".

## Usage

Go to JSON-RPC Request Builder and select "Simulate Send Transaction" from the dropdown menu. You can then enter the JSON payload and click "Send Request".

## Method

### **extension_sendRawTransaction**

### Request

Parameters

1. DATA, The signed transaction data.

Example:
```json
params: [
  "0x02f871018302e67c80850562ac7da9827530944675c7e5baafbffbca748158becba61ef3b0a26387892f979bff1e8480c080a02c0c4fc3543712113a8a3fffc8e0bd31e152f3563817d585c75638768e89badca0416a72bb57c2378e79cb52d8b2d589f1bca069662501c94d990dba02be8e61c2"
]
```

### Response

DATA, 32 Bytes - the transaction hash, or the zero hash if the transaction is not yet available.

Example:
```json
{
  "id":0,
  "jsonrpc": "2.0",
  "result": "e00e63a38f50e5effce7d5546e7a7e62312468a74a179bace67ff1d82c029366"
}
```
