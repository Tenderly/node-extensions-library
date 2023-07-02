# PM Supported Entry Points Extension

This function returns the list of EntryPoint contracts that are supported on that chain.

To use this endpoint, you must have an API key with [Pimlico](https://pimlico.io).

Want to use an entryPoint that is not currently supported? Please contact us at kristof@pimlico.io
or [@kristofgazso](https://t.me/kristofgazso) on Telegram to sign up.

More info can be found here: https://docs.pimlico.io/reference/pm_supportedentrypoints.

## Installation

Go to the Extensions Library and search for "pmSupportedEntryPoints". Click on the extension and click
"Activate".

## Usage

Go to JSON-RPC Request Builder and select "PM Supported Entry Points" from the dropdown menu. You can then enter the
JSON payload and click "Send Request".

## Method

### **extension_pmSupportedEntryPoints**

### Request

Example:

```json
{
  "id": 0,
  "jsonrpc": "2.0",
  "method": "extension_pmSupportedEntryPoints",
  "params": []
}
```

### Response

A JSON-RPC response object with a single array representing the entryPoint contracts supported.

Example

```json
{
  "id": 0,
  "jsonrpc": "2.0",
  "result": [
    "0x0576a174D229E3cFA37253523E645A78A0C91B57"
  ]
}
```
