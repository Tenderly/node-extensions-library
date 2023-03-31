const ethers = require('ethers');

const tx = {
  'blockHash': '0x21cd0244c83e5a10889210f17d3965c7c94b55009f98205fd4c6e0099dde3d32',
  'blockNumber': 16942948,
  'cumulativeGasUsed': '0xeda68c',
  'from': '0x1f9090aaE28b8a3dCeaDf281B0F12828e676c326',
  'gas': '0x5208',
  'gasFeeCap': '0x830490e70',
  'gasPrice': '0x830490e70',
  'gasTipCap': '0x0',
  'gasUsed': '0x5208',
  'hash': '0x18e7961e1fbefe362379745411aba263ba9391774e8f25642b4027783406279a',
  'input': '0x',
  'logs': [],
  'network': '1',
  'nonce': '0x9394',
  'to': '0xe688b84b23f322a994A53dbF8E15FA82CDB71127',
  'value': '0xcc04e873b04018',
};

const PRIVATE_KEY = '41d70d9456668e66748069493498322dc71237fecd5026372fa6fd7e0d923a30';

const sendSimulateRawTransaction = async () => {
  const defaultGatewayURL = 'https://mainnet.gateway.tenderly.co/54vPkVGw1FliymTHBD2G35';
  const provider = new ethers.providers.JsonRpcProvider(defaultGatewayURL);
  const wallet = new ethers.Wallet(PRIVATE_KEY);

  const txCount = await provider.getTransactionCount(wallet.getAddress());
  const transaction = {
    to: '0xa238b6008Bc2FBd9E386A5d4784511980cE504Cd',
    value: ethers.utils.parseEther('0.001'),
    gasLimit: '21000',
    maxPriorityFeePerGas: ethers.utils.parseUnits('5', 'gwei'),
    maxFeePerGas: ethers.utils.parseUnits('20', 'gwei'),
    nonce: txCount,
    type: 2,
    chainId: 1,
  };
  const parsedTransaction = {
    from: tx.from,
    to: tx.to,
    gasLimit: ethers.BigNumber.from(tx.gas),
    gasPrice: ethers.BigNumber.from(tx.gasPrice),
    value: ethers.BigNumber.from(tx.value),
    data: tx.input,
  };
  console.log({
    txCount,
    tx,
    parsedTransaction,
  });
  const rawTransaction = await wallet.signTransaction(parsedTransaction);
  console.log({
    rawTransaction,
  });

  // const simResponse = await provider.send('tenderly_simulateTransaction', [
  //   {
  //     // ...tx,
  //     from: tx.from,
  //     to: tx.to,
  //     gas: tx.gas,
  //     gasPrice: tx.gasPrice,
  //     value: tx.value,
  //     data: tx.input,
  //   },
  //   'latest',
  // ]);
  // console.log({ simResponse });
  //
  // if (simResponse.status === false) {
  //   return Promise.reject({
  //     error: 'Simulation failed',
  //     simResponse,
  //   });
  // }

  const response = await provider.send('eth_sendRawTransaction', [rawTransaction]);
  console.log({ response });
};

sendSimulateRawTransaction();
