# PM Supported Entry Points

This function returns the list of entryPoint contracts that are supported on that chain.

Want to use an entryPoint that is not currently supported? Please contact us at kristof@pimlico.io or @kristofgazso on telegram and we can see if we can support it.

## Installation

More info https://docs.pimlico.io/docs/wallets/api/#pm_supportedentrypoints.

## Usage

TODO

### Request

TODO

```json
{
  "jsonrpc": "2.0",
  "method": "pm_supportedEntryPoints",
  "params": [],
  "id": "1"
}
```

### Response

A JSON-RPC response object with a single array representing the entryPoint contracts supported.

```json
{
  "jsonrpc": "2.0",
  "result": ["0x0576a174D229E3cFA37253523E645A78A0C91B57"],
  "id": "1"
}
```
