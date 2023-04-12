# Multicall ERC20 Uniswap Balance Extension

This extension uses [Wonderland's](https://twitter.com/defi_wonderland) multicall strategy to fetch Uniswap's ERC20 balance in the range [{{offset}}, {{offset}}+{{limit}}] of all pairs. Multicall optimizes `eth_call` performance and lower the consumption of the node RPC. 

## Installation

Go to the Extensions Library and search for "Multicall ERC20 Uniswap Balance". Click on the extension and click "Activate".

## Usage

Go to JSON-RPC Request Builder and select "Multicall ERC20 Uniswap Balance" from the dropdown menu. You can then enter the JSON payload and click "Send Request".

## Method

### **extension_multicallERC20UniswapBalance**

### Request

Parameters

1. QUANTITY, offset of the query.
2. QUANTITY, limit of the query.

Example:
```json
{
  "id": "1",
  "jsonrpc": "2.0",
  "method": "extension_multicallERC20UniswapBalance",
  "params": ["0x0", "0x100"]
}
```

### Response



Example:
```json
{
  "id":0,
  "jsonrpc": "2.0",
  "result": {}
}
```
