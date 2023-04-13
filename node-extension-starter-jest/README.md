# Example Node Extension with Jest

A Node Extension that gets the current block number. This is an example of a Node Extension that can be used as a template for creating your own Node Extension.
It has the Jest testing library pre-installed.

## Installation

Fork the repository or download the source code.

## Usage

Replace with your own code. The `actions` folder contains the source code for the Node Extension. The `test` folder contains the tests for the Node Extension.

### Request

Parameters

**BLOCK_NUMBER**: A block number, or the string "latest", "earliest" or "pending". You can use the hex value of the block number as well.

Example:
```json
{
  "id": "1",
  "jsonrpc": "2.0",
  "method": "extension_multicallERC20UniswapBalance",
  "params": ["latest"]
}
```

### Response

Example:
```json
{
  "id": 0,
  "jsonrpc": "2.0",
  "result": {
    "...": "..."
  }
}
```
