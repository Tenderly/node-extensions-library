# Simulate Send Transaction Node Extension

This extension allows you to simulate a transaction before sending it to the network. This is useful for testing and debugging purposes.

## Installation

Go to the Extensions Library and search for "Simulate Send Transaction". Click on the extension and click "Activate".

## Usage

Go to JSON-RPC Request Builder and select "Simulate Send Transaction" from the dropdown menu. You can then enter the JSON payload and click "Send Request".

### Request

The JSON payload must have a 'data' field with the transaction data. The 'data' field must be a hex string. E.g. raw transaction value.

```json
{
  "data": "0x02f871018302e67c80850562ac7da9827530944675c7e5baafbffbca748158becba61ef3b0a26387892f979bff1e8480c080a02c0c4fc3543712113a8a3fffc8e0bd31e152f3563817d585c75638768e89badca0416a72bb57c2378e79cb52d8b2d589f1bca069662501c94d990dba02be8e61c2"
}
```

### Response

```json
{
  "TODO": "TODO"
}
```
