interface Docs {
  nftFloorUnits: any;
  assetName?: string;
  feedCategory?: string;
  feedType?: string;
  hidden?: boolean;
  porAuditor?: string;
  porType?: string;
  shutdownDate?: string;
}

interface ChainMetadata {
  compareOffchain: string;
  contractAddress: string;
  contractType: string;
  contractVersion: number;
  decimalPlaces: number | null;
  ens: null | string;
  formatDecimalPlaces: number | null;
  healthPrice: string;
  heartbeat: number;
  history: boolean;
  multiply: string;
  name: string;
  pair: string[];
  path: string;
  proxyAddress: null | string;
  threshold: number;
  valuePrefix: string;
  assetName: string;
  feedCategory: string;
  feedType: string;
  docs: Docs;
  transmissionsAccount: null | string;
}

type ChainTags = ('default' | 'proofOfReserve' | 'nftFloorPrice')[]

interface ChainNetwork {
  name: string;
  explorerUrl: string;
  networkType: 'mainnet' | 'testnet';
  rddUrl?: string;
  metadata?: ChainMetadata[];
  tags?: ChainTags;
}

interface Chain {
  page: string;
  title: string;
  img?: string;
  networkStatusUrl: string;
  networks: ChainNetwork[];
  label?: string;
  tags?: ChainTags;
}

export {
  Chain,
  ChainNetwork,
  ChainTags,
  ChainMetadata,
  Docs,
};
