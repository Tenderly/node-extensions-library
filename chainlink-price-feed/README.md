# Chainlink Price Feed Extension

Gets the data from the latest round on [Chainlink price feed contract](https://docs.chain.link/data-feeds/price-feeds/addresses) given the token pair.
Supported networks are Ethereum Mainnet, Sepolia Testnet, Goerli Testnet, Polygon Mainnet & Polygon Mumbai.

## Installation

Go to the Extensions Library and search for "Chainlink Price Feed". Click on the extension and click "Activate".

## Usage

Go to JSON-RPC Request Builder and select "Chainlink Price Feed" from the dropdown menu. You can then enter the JSON payload and click "Send Request".

## Method

### **extension_chainlinkPriceFeed**

### Request

Parameters

1. DATA, Coin pair.

Example:
```json
{
  "id": 0,
  "jsonrpc": "2.0",
  "method": "extension_chainlinkPriceFeed",
  "params": ["USDT/ETH"]
}
```

### Response

See results from latestRoundData - https://docs.chain.link/data-feeds/api-reference#latestrounddata

Example:
```json
{
  "id": 0,
  "jsonrpc": "2.0",
  "result": {
    "roundId": "0x400000000000023E7",
    "answer": "0x1E4D0CC2AE885",
    "startedAt": "0x6436143B",
    "updatedAt": "0x6436143B",
    "answeredInRound": "0x400000000000023E7"
  }
}
```
