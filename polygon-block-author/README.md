# Polygon Block Author Extension

This extension fetches the block for associated Polygon Network, and computes the block author a.k.a coinbase. The
extension will throw for non-Polygon networks.

## Installation

Go to the Extensions Library and search for "polygonBlockAuthor". Click on the extension and click "Activate".

![image](https://github.com/Tenderly/node-extensions-library/assets/26412515/85579a9e-3d2d-437e-9da7-3bc9c5fcbfb5)

## Usage

Go to JSON-RPC Request Builder and select "Polygon Block Author" from the dropdown menu. You can then enter the JSON
payload and click "Send Request".

![image](https://github.com/Tenderly/node-extensions-library/assets/26412515/05992ce4-e96a-4f89-bc55-da5251695f20)

## Method

### **extension_polygonBlockAuthor**

### Request

Parameters

1. **QUANTITY**, number of the block to query.

Example:

```json
{
  "id": 0,
  "jsonrpc": "2.0",
  "method": "extension_polygonBlockAuthor",
  "params": ["0x2625A00"]
}
```

### Response

**DATA**, 20 Bytes - the coinbase address.

Example:

```json
{
  "id": 0,
  "jsonrpc": "2.0",
  "result": "0x1efecb61a2f80aa34d3b9218b564a64d05946290"
}
```
