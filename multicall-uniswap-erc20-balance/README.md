# Multicall ERC20 Uniswap Balance Extension

This extension uses [Wonderland's](https://twitter.com/defi_wonderland) multicall strategy to fetch Uniswap's ERC20
balance in the range `[{{offset}}, {{offset}}+{{limit}}]` of all pairs. Multicall optimizes `eth_call` performance and
lower the consumption of the node RPC.

## Installation

Go to the Extensions Library and search for "Multicall ERC20 Uniswap Balance". Click on the extension and click
"Activate".

![image](https://github.com/Tenderly/node-extensions-library/assets/26412515/345a6efc-62c7-4484-95c5-56f64a341b70)

## Usage

Go to JSON-RPC Request Builder and select "Multicall ERC20 Uniswap Balance" from the dropdown menu. You can then enter
the JSON payload and click "Send Request".

![image](https://github.com/Tenderly/node-extensions-library/assets/26412515/bb3fbdc8-9104-47cb-b67a-51fc992558ec)

## Method

### **extension_multicallERC20UniswapBalance**

### Request

Parameters

1. **QUANTITY**, offset of the query.
2. **QUANTITY**, limit of the query.

Example:

```json
{
  "id": 0,
  "jsonrpc": "2.0",
  "method": "extension_multicallERC20UniswapBalance",
  "params": [
    "0x0",
    "0x100"
  ]
}
```

### Response

Example:

```json
{
  "id": 0,
  "jsonrpc": "2.0",
  "result": [
    "0x0", "0x0", "0x0", "0x0", "0x0",
    "0x0", "0x0", "0x0", "0x0", "0x0",
    "0x0", "0x0", "0x0", "0x0", "0x0",
    "..."
  ]
}
```
