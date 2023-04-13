# Example Node Extension

A Node Extension that gets the current block number. This is an example of a Node Extension that can be used as a template for creating your own Node Extension.

## Installation

Fork the repository or download the source code.

## Usage

Replace with your own code. The `extension.ts` file is the entry point for your Node Extension.

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
