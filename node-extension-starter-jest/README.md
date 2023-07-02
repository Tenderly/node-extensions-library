# Example Node Extension with Jest

A Node Extension that gets the block from the network, where the `result.transactions` is a list of transaction hashes.
This is an example of a Node Extension that can be used as a template for creating your own Node Extension.
It has the Jest testing library pre-installed.

## Installation

Fork the repository or download the source code.

## Usage

Replace with your own code. The `actions` folder contains the source code for the Node Extension. The `test` folder contains the tests for the Node Extension.

### Request

Parameters

**BLOCK_HASH_OR_TAG**: A block hash or tag. It can be a positive integer or a hex-based string. E.g. `100004` or `"0x1212"`.

Example:

```json
{
  "id": 0,
  "jsonrpc": "2.0",
  "method": "extension_example",
  "params": [100004]
}
```

### Response

Example:

```json
{
  "id": 0,
  "jsonrpc": "2.0",
  "result": {
    "_difficulty": {
      "hex": "0x03803be23db1",
      "type": "BigNumber"
    },
    "difficulty": 3849295379889,
    "extraData": "0x476574682f76312e302e312d39383130306634372f6c696e75782f676f312e34",
    "gasLimit": {
      "hex": "0x2fefd8",
      "type": "BigNumber"
    },
    "gasUsed": {
      "hex": "0x5208",
      "type": "BigNumber"
    },
    "hash": "0xf93283571ae16dcecbe1816adc126954a739350cd1523a1559eabeae155fbb63",
    "miner": "0x909755D480A27911cB7EeeB5edB918fae50883c0",
    "nonce": "0x1a455280001cc3f8",
    "number": 100004,
    "parentHash": "0x73d88d376f6b4d232d70dc950d9515fad3b5aa241937e362fdbfd74d1c901781",
    "timestamp": 1439799168,
    "transactions": [
      "0x6f12399cc2cb42bed5b267899b08a847552e8c42a64f5eb128c1bcbd1974fb0c"
    ]
  }
}
```
