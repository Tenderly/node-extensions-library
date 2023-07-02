const fs = require('fs');

const getFeedsMetadata = (url) => {
  return fetch(url).then((res) => res.json());
};

// Data: https://github.com/smartcontractkit/documentation/blob/main/src/features/feeds/data/chains.ts
async function getData(metadataUrl, fileName) {
  const data = await getFeedsMetadata(metadataUrl);

  console.log(`Fetching data from ${metadataUrl}...`);

  fs.writeFile(
    `${__dirname}/../data/${fileName}`,
    JSON.stringify(data, null, 2),
    'utf-8',
    (err) => {
      console.log(err);
    });

  console.log(`Created a file ${fileName}`);
  return data;
}

async function getDataForSupportedChains() {
  // Ethereum Mainnet
  await getData('https://reference-data-directory.vercel.app/feeds-mainnet.json', 'feeds-ethereum-mainnet.json');

  // Ethereum Goerli
  await getData('https://reference-data-directory.vercel.app/feeds-goerli.json', 'feeds-ethereum-testnet-goerli.json');

  // Ethereum Sepolia
  await getData('https://reference-data-directory.vercel.app/feeds-ethereum-testnet-sepolia.json', 'feeds-ethereum-testnet-sepolia.json');

  // Polygon Mainnet
  await getData('https://reference-data-directory.vercel.app/feeds-matic-mainnet.json', 'feeds-matic-mainnet.json');

  // Polygon Mumbai
  await getData('https://reference-data-directory.vercel.app/feeds-matic-testnet.json', 'feeds-matic-testnet.json');
}

getDataForSupportedChains();
