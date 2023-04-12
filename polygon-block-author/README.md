# Polygon Block Author Extension

This extension fetches the block for associated Polygon Network, and computes the block author a.k.a coinbase. The extension will throw for non-Polygon networks.

## Installation

Go to the Extensions Library and search for "Polygon Block Author". Click on the extension and click "Activate".

## Usage

Go to JSON-RPC Request Builder and select "Polygon Block Author" from the dropdown menu. You can then enter the JSON payload and click "Send Request".

## Method

### **extension_polygonBlockAuthor**

### Request

Parameters

1. QUANTITY, number of the block to query.

Example:
```json
{
  "id": "1"
  "jsonrpc": "2.0",
  "method": "extension_polygonBlockAuthor",
  "params": ["0x2625A00"]
}
```

### Response

DATA, 20 Bytes - the coinbase address.

Example:
```json
{
  "id":0,
  "jsonrpc": "2.0",
  "result": "0x1efecb61a2f80aa34d3b9218b564a64d05946290"
}
```
