# Simulate Mempool Transaction Extension

This extension simulates transaction that is in the mempool.

## Installation

Go to the Extensions Library and search for "Simulate Mempool Transaction". Click on the extension and click "Activate".

## Usage

Go to JSON-RPC Request Builder and select "Simulate Mempool Transaction" from the dropdown menu. You can then enter the JSON payload and click "Send Request".

## Method

### **extension_simulateMempoolTransaction**

### Request

Parameters

1. DATA, 32 Bytes - the transaction hash.

Example:
```json
{
  "id": "1"
  "jsonrpc": "2.0",
  "method": "extension_simulateMempoolTransaction",
  "params": ["e00e63a38f50e5effce7d5546e7a7e62312468a74a179bace67ff1d82c029366"]
}
```

### Response

See results from tenderly_simulateTransaction - https://docs.tenderly.co/web3-gateway/references/simulate-json-rpc

Example:
```json
{
  "id":0,
  "jsonrpc": "2.0",
  "result": {
    "status": true,
    "gasUsed": "0xc94e",
    "cumulativeGasUsed": "0x0",
    "blockNumber": "0x103de41",
    "type": "0x0",
    "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000002000000080000000000000000000000000000000000000000000008000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000010000000000000004000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000020000000000000000000000000000000000200000800000000000000000000000000000000000000000000000000000",
    "logs": [
      {
        "name": "Transfer",
        "anonymous": false,
        "inputs": [
          {
            "value": "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
            "type": "address",
            "name": "src"
          },
          {
            "value": "0x20a5814b73ef3537c6e099a0d45c798f4bd6e1d6",
            "type": "address",
            "name": "dst"
          },
          {
            "value": "1",
            "type": "uint256",
            "name": "wad"
          }
        ],
        "raw": {
          "address": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
          "topics": [
            "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
            "0x000000000000000000000000d8da6bf26964af9d7eed9e03e53415d37aa96045",
            "0x00000000000000000000000020a5814b73ef3537c6e099a0d45c798f4bd6e1d6"
          ],
          "data": "0x0000000000000000000000000000000000000000000000000000000000000001"
        }
      }
    ],
    "trace": [
      {
        "type": "CALL",
        "from": "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
        "to": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        "gas": "0x5f58cbc",
        "gasUsed": "0x750a",
        "value": "0x0",
        "input": "0xa9059cbb00000000000000000000000020a5814b73ef3537c6e099a0d45c798f4bd6e1d60000000000000000000000000000000000000000000000000000000000000001",
        "decodedInput": [
          {
            "value": "0x20a5814b73ef3537c6e099a0d45c798f4bd6e1d6",
            "type": "address",
            "name": "dst"
          },
          {
            "value": "1",
            "type": "uint256",
            "name": "wad"
          }
        ],
        "method": "transfer",
        "output": "0x0000000000000000000000000000000000000000000000000000000000000001",
        "decodedOutput": [
          {
            "value": true,
            "type": "bool",
            "name": ""
          }
        ],
        "subtraces": 0,
        "traceAddress": [
          0
        ]
      }
    ]
  }
}
```
