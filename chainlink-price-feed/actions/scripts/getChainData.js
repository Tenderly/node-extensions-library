const fs = require('fs');

const getFeedsMetadata = (url) => {
  return fetch(url).then((res) => res.json());
};

async function getData() {
  const data = await getFeedsMetadata('https://reference-data-directory.vercel.app/feeds-goerli.json');

  fs.writeFile(
    'data/feeds-ethereum-testnet-goerli.json',
    JSON.stringify(data, null, 2),
    'utf-8',
    (err) => {
      console.log(err);
    });

  console.log('done');
  return data;
}

getData();
