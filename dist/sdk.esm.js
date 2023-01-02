import JSBI from 'jsbi';
export { default as JSBI } from 'jsbi';
import invariant from 'tiny-invariant';
import warning from 'tiny-warning';
import { getAddress, getCreate2Address } from '@ethersproject/address';
import _Big from 'big.js';
import toFormat from 'toformat';
import _Decimal from 'decimal.js-light';
import { keccak256, pack } from '@ethersproject/solidity';
import { Contract } from '@ethersproject/contracts';
import { getNetwork } from '@ethersproject/networks';
import { getDefaultProvider } from '@ethersproject/providers';
import IPangolinPair from '@pangolindex/exchange-contracts/artifacts/contracts/pangolin-core/PangolinPair.sol/PangolinPair.json';

var _CHAINS;

var ChainId;

(function (ChainId) {
  ChainId[ChainId["FUJI"] = 43113] = "FUJI";
  ChainId[ChainId["AVALANCHE"] = 43114] = "AVALANCHE";
  ChainId[ChainId["WAGMI"] = 11111] = "WAGMI";
  ChainId[ChainId["COSTON"] = 16] = "COSTON";
  ChainId[ChainId["SONGBIRD"] = 19] = "SONGBIRD";
  ChainId[ChainId["NEAR_MAINNET"] = 329847900] = "NEAR_MAINNET";
  ChainId[ChainId["NEAR_TESTNET"] = 329847901] = "NEAR_TESTNET";
})(ChainId || (ChainId = {}));

var StakingType;

(function (StakingType) {
  StakingType["LEGACY"] = "LEGACY";
  StakingType["SAR_POSITIONS"] = "SAR_POSITIONS";
  StakingType["NEAR_STAKING"] = "NEAR_STAKING";
})(StakingType || (StakingType = {}));

var AirdropType;

(function (AirdropType) {
  AirdropType["LEGACY"] = "LEGACY";
  AirdropType["MERKLE"] = "MERKLE";
  AirdropType["MERKLE_TO_STAKING"] = "MERKLE_TO_STAKING";
  AirdropType["NEAR_AIRDROP"] = "NEAR_AIRDROP";
})(AirdropType || (AirdropType = {}));

var ChefType;

(function (ChefType) {
  ChefType["MINI_CHEF"] = "MINI_CHEF";
  ChefType["MINI_CHEF_V2"] = "MINI_CHEF_V2";
  ChefType["PANGO_CHEF"] = "PANGO_CHEF";
  ChefType["NEAR_CHEF"] = "NEAR_CHEF";
})(ChefType || (ChefType = {}));

var ETHEREUM_MAINNET = {
  id: 'ethereum_mainnet',
  chain_id: 1,
  name: 'Ethereum',
  symbol: 'ETH',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/eth.png',
  pangolin_is_live: false,
  tracked_by_debank: true,
  supported_by_gelato: true,
  rpc_uri: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  coingecko_id: 'ethereum',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18
  },
  blockExplorerUrls: ['https://etherscan.io']
};
var ARBITRUM_MAINNET = {
  id: 'arbitrum_mainnet',
  chain_id: 42161,
  name: 'Arbitrum',
  symbol: 'ARB',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/arb.png',
  pangolin_is_live: false,
  tracked_by_debank: true,
  supported_by_gelato: true,
  rpc_uri: 'https://arb1.arbitrum.io/rpc',
  coingecko_id: 'arbitrum-one',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18
  },
  blockExplorerUrls: ['https://arbiscan.io']
};
var ARBITRUM_RINKEBY = {
  id: 'arbitrum_rinkeby',
  chain_id: 421611,
  name: 'Arbitrum Rinkbey',
  symbol: 'ARB',
  mainnet: false,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/arb.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: true,
  rpc_uri: 'https://rinkeby.arbitrum.io/rpc',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18
  },
  blockExplorerUrls: ['https://rinkeby-explorer.arbitrum.io']
};
var AURORA_MAINNET = {
  id: 'aurora_mainnet',
  chain_id: 1313161554,
  name: 'Aurora',
  symbol: 'AURORA',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/aurora.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://mainnet.aurora.dev',
  coingecko_id: 'aurora',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18
  },
  blockExplorerUrls: ['https://aurorascan.dev']
};
var AURORA_TESTNET = {
  id: 'aurora_testnet',
  chain_id: 1313161555,
  name: 'Aurora Testnet',
  symbol: 'AURORA',
  mainnet: false,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/aurora.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://testnet.aurora.dev',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18
  },
  blockExplorerUrls: ['https://testnet.aurorascan.dev']
};
var AVALANCHE_MAINNET = {
  id: 'avalanche_mainnet',
  chain_id: 43114,
  name: 'Avalanche',
  symbol: 'AVAX',
  png_symbol: 'PNG',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/avax.png',
  pangolin_is_live: true,
  tracked_by_debank: true,
  supported_by_gelato: true,
  rpc_uri: 'https://api.avax.network/ext/bc/C/rpc',
  subgraph: {
    exchange: 'https://api.thegraph.com/subgraphs/name/pangolindex/exchange'
  },
  coingecko_id: 'avalanche',
  debank_pangolin_id: 'avax_pangolin',
  contracts: {
    png: '0x60781C2586D68229fde47564546784ab3fACA982',
    factory: '0xefa94DE7a4656D787667C749f7E1223D71E9FD88',
    router: '0xE54Ca86531e17Ef3616d22Ca28b0D458b6C89106',
    router_daas: '0xEfd958c7C68b7e6a88300E039cAE275ca741007F',
    wrapped_native_token: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
    local_multisig: '0x66c048d27aFB5EE59E4C07101A483654246A4eda',
    community_treasury: '0x650f5865541f6D68BdDFE977dB933C293EA72358',
    treasury_vester: '0x6747AC215dAFfeE03a42F49FebB6ab448E12acEe',
    mini_chef: {
      address: '0x1f806f7C8dED893fd3caE279191ad7Aa3798E928',
      active: true,
      type: ChefType.MINI_CHEF_V2
    },
    airdrop: {
      address: '0x0C58C2041da4CfCcF5818Bbe3b66DBC23B3902d9',
      active: false,
      type: AirdropType.LEGACY
    },
    timelock: '0xEB5c91bE6Dbfd30cf616127C2EA823C64e4b1ff8',
    governor: '0xb0Ff2b1047d9E8d294c2eD798faE3fA817F43Ee1',
    migrator: '0x4b23Aa72A1214d0E4fd3f2c8Da7C6ba660F7483C',
    multicall: '0x0FB54156B496b5a040b51A71817aED9e2927912E',
    staking: [{
      address: '0x88afdaE1a9F58Da3E68584421937E5F564A0135b',
      active: true,
      reward_token: '0x60781C2586D68229fde47564546784ab3fACA982',
      type: StakingType.LEGACY
    }]
  },
  nativeCurrency: {
    name: 'Avalanche',
    symbol: 'AVAX',
    decimals: 18
  },
  blockExplorerUrls: ['https://snowtrace.io']
};
var AVALANCHE_FUJI = {
  id: 'avalanche_fuji',
  chain_id: 43113,
  name: 'Avalanche Fuji',
  symbol: 'AVAX',
  png_symbol: 'fujiPNG',
  mainnet: false,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/avax.png',
  pangolin_is_live: true,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://api.avax-test.network/ext/bc/C/rpc',
  contracts: {
     png: '0xBBfeDb04Cc7d030d29Cc34dd0081f062C4C78818',
    factory: '0xd17c8AD27f7B3c163BD88008f04cfAd75f0Af228',
    router: '0x2B6B2abAA42c82611D7dBc8Faa5C82cC08Edd960',
    router_daas: '0xFE97f59B72eEE0F29F93e12195C6F35DCdAB6899',
    wrapped_native_token: '0xd00ae08403B9bbb9124bB305C09058E32C39A48c',
    timelock: "0xD04b1D16ca27B26e6333705FBF31aAbE21DBd431",
    mini_chef: {
      address: '0x0bD3dde1Ac6AD1136a91a5A0fe7ac25B618D5bD3',
      active: true,
      type: ChefType.MINI_CHEF_V2
    },
    community_treasury: '0x48F9686E1946EB4B41C56219974956e13368c3F1',
    airdrop: {
      address: '0x6BdF0D0Fe9161Bef8afc7948C72b3FC82728B06e',
      active: false,
      type: AirdropType.LEGACY
    },
    treasury_vester: "0x016161B46fE40BC9aB04759491Eed2468dD88E1c",
    revenue_distributor: "0x9f4bbFF2792C3d5BEEf445392018B7e42068b48b",
    fee_collector: "0xa52Fb206df12Ca7E9cd09Ac9B2Af2327242e8A08",
    multicall: '0xb465Fd2d9C71d5D6e6c069aaC9b4E21c69aAA78f',
     staking: [{
      address: "0x1C448add41b92E2201a51FB18d06556041e51795",
      active: true,
      reward_token: "0xBBfeDb04Cc7d030d29Cc34dd0081f062C4C78818",
      type: StakingType.LEGACY
    }]
  },
  nativeCurrency: {
    name: 'Avalanche',
    symbol: 'AVAX',
    decimals: 18
  },
  blockExplorerUrls: ['https://testnet.snowtrace.io']
};
var BOBA_MAINNET = {
  id: 'boba_mainnet',
  chain_id: 288,
  name: 'Boba',
  symbol: 'BOBA',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/boba.png',
  pangolin_is_live: false,
  tracked_by_debank: true,
  supported_by_gelato: false,
  rpc_uri: 'https://mainnet.boba.network',
  coingecko_id: 'boba',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18
  },
  blockExplorerUrls: ['https://blockexplorer.boba.network']
};
var BITTORRENT_MAINNET = {
  id: 'bittorrent_mainnet',
  chain_id: 199,
  name: 'BitTorrent',
  symbol: 'BTT',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/btt.png',
  pangolin_is_live: false,
  tracked_by_debank: true,
  supported_by_gelato: false,
  rpc_uri: 'https://rpc.bt.io',
  nativeCurrency: {
    name: 'BitTorrent',
    symbol: 'BTT',
    decimals: 18
  },
  blockExplorerUrls: ['https://scan.bt.io']
};
var BITTORRENT_TESTNET = {
  id: 'bittorrent_testnet',
  chain_id: 1028,
  name: 'BitTorrent Testnet',
  symbol: 'BTT',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/btt.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://test-rpc.bittorrentchain.io',
  nativeCurrency: {
    name: 'BitTorrent',
    symbol: 'BTT',
    decimals: 18
  },
  blockExplorerUrls: ['https://scan.bittorrentchain.io']
};
var BSC_MAINNET = {
  id: 'bsc_mainnet',
  chain_id: 56,
  name: 'Binance',
  symbol: 'BSC',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/bsc.png',
  pangolin_is_live: false,
  tracked_by_debank: true,
  supported_by_gelato: true,
  rpc_uri: 'https://bsc-dataseed.binance.org',
  coingecko_id: 'binance-smart-chain',
  nativeCurrency: {
    name: 'Binance Coin',
    symbol: 'BNB',
    decimals: 18
  },
  blockExplorerUrls: ['https://bscscan.com']
};
var BSC_TESTNET = {
  id: 'bsc_testnet',
  chain_id: 97,
  name: 'Binance Testnet',
  symbol: 'BSC',
  mainnet: false,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/bsc.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: true,
  rpc_uri: 'https://data-seed-prebsc-1-s1.binance.org:8545',
  nativeCurrency: {
    name: 'Binance Coin',
    symbol: 'BNB',
    decimals: 18
  },
  blockExplorerUrls: ['https://testnet.bscscan.com']
};
var CELO_MAINNET = {
  id: 'celo_mainnet',
  chain_id: 42220,
  name: 'Celo',
  symbol: 'CELO',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/celo.png',
  pangolin_is_live: false,
  tracked_by_debank: true,
  supported_by_gelato: false,
  rpc_uri: 'https://forno.celo.org',
  coingecko_id: 'celo',
  nativeCurrency: {
    name: 'Celo',
    symbol: 'CELO',
    decimals: 18
  },
  blockExplorerUrls: ['https://explorer.celo.org']
};
var CELO_ALFAJORES_TESTNET = {
  id: 'celo_alfadores_testnet',
  chain_id: 44787,
  name: 'Celo Alfajores',
  symbol: 'CELO',
  mainnet: false,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/celo.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://alfajores-forno.celo-testnet.org',
  nativeCurrency: {
    name: 'Celo',
    symbol: 'CELO',
    decimals: 18
  },
  blockExplorerUrls: ['https://alfajores-blockscout.celo-testnet.org']
};
var CELO_BAKLAVA_TESTNET = {
  id: 'celo_baklava_testnet',
  chain_id: 62320,
  name: 'Celo Baklava',
  symbol: 'CELO',
  mainnet: false,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/celo.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://baklava-forno.celo-testnet.org',
  nativeCurrency: {
    name: 'Celo',
    symbol: 'CELO',
    decimals: 18
  },
  blockExplorerUrls: ['https://baklava-blockscout.celo-testnet.org']
};
var CRONOS_MAINNET = {
  id: 'cronos_mainnet',
  chain_id: 25,
  name: 'Cronos',
  symbol: 'CRO',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/cro.png',
  pangolin_is_live: false,
  tracked_by_debank: true,
  supported_by_gelato: false,
  rpc_uri: 'https://evm-cronos.crypto.org',
  coingecko_id: 'cronos',
  nativeCurrency: {
    name: 'Cronos',
    symbol: 'CRO',
    decimals: 18
  },
  blockExplorerUrls: ['https://cronos.org/explorer']
};
var CRONOS_TESTNET = {
  id: 'cronos_testnet',
  chain_id: 338,
  name: 'Cronos',
  symbol: 'CRO',
  mainnet: false,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/cro.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://cronos-testnet-3.crypto.org:8545',
  nativeCurrency: {
    name: 'Cronos',
    symbol: 'CRO',
    decimals: 18
  },
  blockExplorerUrls: ['https://cronos.org/explorer/testnet3']
};
var COSTON_TESTNET = {
  id: 'coston_testnet',
  chain_id: 16,
  name: 'Coston',
  symbol: 'cFLR',
  png_symbol: 'PCT',
  mainnet: false,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/flare.png',
  pangolin_is_live: true,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://coston-api.flare.network/ext/bc/C/rpc',
  contracts: {
    png: '0x0A8744c2a48b0e09a3e4C3A381A8E0d8d900bAFe',
    factory: '0xa5D4D920cea39f0344A99b2a3c4597E10DA16D88',
    router: '0x6a6C605700f477E56B9542Ca2a3D68B9A7edf599',
    wrapped_native_token: '0x1659941d425224408c5679eeef606666c7991a8A',
    local_multisig: '0x177126EC2D5BabD6a1374135F082b875773afC45',
    community_treasury: '0x48197135bA4a9F5F9aB1296A6405c9495AB4Cfd3',
    treasury_vester: '0x1a6a55a22a696F757f0ade055200308B53D70CAc',
    mini_chef: {
      address: '0xFf0C4041ba52428612320cAD2016d07B2e4A802D',
      active: true,
      type: ChefType.PANGO_CHEF
    },
    airdrop: {
      address: '0x700E2E6fd3C5174E9691a65DC12f44d0A8dd25EC',
      active: true,
      type: AirdropType.MERKLE_TO_STAKING
    },
    timelock: '0xc63C2BA9F4dD17F881d9195fD105611760689bAe',
    fee_collector: '0x39DEA895DA8cC6ef744Da4C5Cc06F1E6150362f1',
    multicall: '0xF7aB82e5253F65496e21dF0dacfA6D5e765b4874',
    staking: [{
      address: '0xc064943492c9DF4f8238Bf52E7B7170A0Ec6FBAF',
      active: true,
      reward_token: '0x0A8744c2a48b0e09a3e4C3A381A8E0d8d900bAFe',
      type: StakingType.SAR_POSITIONS
    }]
  },
  nativeCurrency: {
    name: 'CostonFlare',
    symbol: 'CFLR',
    decimals: 18
  },
  blockExplorerUrls: ['https://coston-explorer.flare.network']
};
var EVMOS_TESTNET = {
  id: 'evmos_testnet',
  chain_id: 9000,
  name: 'EVMOS Testnet',
  symbol: 'tEVMOS',
  mainnet: false,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/evmos.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://eth.bd.evmos.dev:8545',
  nativeCurrency: {
    name: 'EVMOS',
    symbol: 'EVMOS',
    decimals: 18
  },
  blockExplorerUrls: ['https://evm.evmos.dev']
};
var EVMOS_MAINNET = {
  id: 'evmos_mainnet',
  chain_id: 9001,
  name: 'EVMOS',
  symbol: 'EVMOS',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/evmos.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://eth.bd.evmos.org:8545',
  nativeCurrency: {
    name: 'EVMOS',
    symbol: 'EVMOS',
    decimals: 18
  },
  blockExplorerUrls: ['https://evm.evmos.org']
};
var FANTOM_MAINNET = {
  id: 'fantom_mainnet',
  chain_id: 250,
  name: 'Fantom',
  symbol: 'FTM',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/ftm.png',
  pangolin_is_live: false,
  tracked_by_debank: true,
  supported_by_gelato: true,
  rpc_uri: 'https://rpc.ftm.tools',
  coingecko_id: 'fantom',
  nativeCurrency: {
    name: 'Fantom',
    symbol: 'FTM',
    decimals: 18
  },
  blockExplorerUrls: ['https://ftmscan.com']
};
var FANTOM_TESTNET = {
  id: 'fantom_testnet',
  chain_id: 4002,
  name: 'Fantom',
  symbol: 'FTM',
  mainnet: false,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/ftm.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: true,
  rpc_uri: 'https://rpc.testnet.fantom.network',
  nativeCurrency: {
    name: 'Fantom',
    symbol: 'FTM',
    decimals: 18
  },
  blockExplorerUrls: ['https://testnet.ftmscan.com']
};
var FUSE_MAINNET = {
  id: 'fuse_mainnet',
  chain_id: 122,
  name: 'Fuse',
  symbol: 'FUSE',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/fuse.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://rpc.fuse.io',
  coingecko_id: 'fuse',
  nativeCurrency: {
    name: 'Fuse',
    symbol: 'FUSE',
    decimals: 18
  },
  blockExplorerUrls: ['http://explorer.fuse.io']
};
var FUSE_TESTNET = {
  id: 'fuse_testnet',
  chain_id: 123,
  name: 'Fuse',
  symbol: 'FUSE',
  mainnet: false,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/fuse.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://rpc.fusespark.io',
  nativeCurrency: {
    name: 'Fuse',
    symbol: 'FUSE',
    decimals: 18
  },
  blockExplorerUrls: ['https://explorer.fusespark.io']
};
var HARMONY_MAINNET = {
  id: 'harmony_mainnet',
  chain_id: 1666600000,
  name: 'Harmony',
  symbol: 'ONE',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/one.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://api.harmony.one',
  coingecko_id: 'harmony-shard-0',
  nativeCurrency: {
    name: 'Harmony',
    symbol: 'ONE',
    decimals: 18
  },
  blockExplorerUrls: ['https://explorer.harmony.one']
};
var HARMONY_TESTNET = {
  id: 'harmony_testnet',
  chain_id: 1666700000,
  name: 'Harmony Testnet',
  symbol: 'ONE',
  mainnet: false,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/one.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://api.s0.b.hmny.io',
  nativeCurrency: {
    name: 'Harmony',
    symbol: 'ONE',
    decimals: 18
  },
  blockExplorerUrls: ['https://explorer.pops.one']
};
var HECO_MAINNET = {
  id: 'heco_mainnet',
  chain_id: 128,
  name: 'Heco',
  symbol: 'HECO',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/heco.png',
  pangolin_is_live: false,
  tracked_by_debank: true,
  supported_by_gelato: false,
  rpc_uri: 'https://http-mainnet.hecochain.com',
  coingecko_id: 'huobi-token',
  nativeCurrency: {
    name: 'Heco',
    symbol: 'HECO',
    decimals: 18
  },
  blockExplorerUrls: ['https://hecoinfo.com']
};
var HECO_TESTNET = {
  id: 'heco_testnet',
  chain_id: 256,
  name: 'Heco',
  symbol: 'HECO',
  mainnet: false,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/heco.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://http-testnet.hecochain.com',
  nativeCurrency: {
    name: 'Heco',
    symbol: 'HECO',
    decimals: 18
  },
  blockExplorerUrls: ['https://scan-testnet.hecochain.com']
};
var KLAYTN_MAINNET = {
  id: 'klaytn_mainnet',
  chain_id: 8217,
  name: 'Klaytn',
  symbol: 'KLAY',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/klay.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://kaikas.cypress.klaytn.net:8651',
  coingecko_id: 'klay-token',
  nativeCurrency: {
    name: 'Klaytn',
    symbol: 'KLAY',
    decimals: 18
  },
  blockExplorerUrls: ['https://scope.klaytn.com']
};
var KLAYTN_BAOBAB = {
  id: 'klaytn_baobab',
  chain_id: 1001,
  name: 'Klaytn Baobab',
  symbol: 'KLAY',
  mainnet: false,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/klay.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://api.baobab.klaytn.net:8651',
  nativeCurrency: {
    name: 'Klaytn',
    symbol: 'KLAY',
    decimals: 18
  },
  blockExplorerUrls: ['https://baobab.scope.klaytn.com']
};
var METIS_MAINNET = {
  id: 'metis_mainnet',
  chain_id: 1088,
  name: 'Metis',
  symbol: 'METIS',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/metis.png',
  pangolin_is_live: false,
  tracked_by_debank: true,
  supported_by_gelato: false,
  rpc_uri: 'https://andromeda.metis.io/?owner=1088',
  coingecko_id: 'metis-andromeda',
  nativeCurrency: {
    name: 'Metis',
    symbol: 'METIS',
    decimals: 18
  },
  blockExplorerUrls: ['https://andromeda-explorer.metis.io']
};
var METIS_RINKEBY = {
  id: 'metis_rinkeby',
  chain_id: 588,
  name: 'Metis Rinkeby',
  symbol: 'METIS',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/metis.png',
  pangolin_is_live: false,
  tracked_by_debank: true,
  supported_by_gelato: false,
  rpc_uri: 'https://stardust.metis.io/?owner=588',
  nativeCurrency: {
    name: 'Metis',
    symbol: 'tMETIS',
    decimals: 18
  },
  blockExplorerUrls: ['https://stardust-explorer.metis.io']
};
var MOONRIVER_MAINNET = {
  id: 'moonriver_mainnet',
  chain_id: 1285,
  name: 'Moonriver',
  symbol: 'MOVR',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/movr.png',
  pangolin_is_live: false,
  tracked_by_debank: true,
  supported_by_gelato: false,
  rpc_uri: 'https://rpc.moonriver.moonbeam.network',
  coingecko_id: 'moonriver',
  nativeCurrency: {
    name: 'Moonriver',
    symbol: 'MOVR',
    decimals: 18
  },
  blockExplorerUrls: ['https://moonriver.moonscan.io']
};
var MOONBEAM_MAINNET = {
  id: 'moonbeam_mainnet',
  chain_id: 1284,
  name: 'Moonbeam',
  symbol: 'MOBM',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/mobm.png',
  pangolin_is_live: false,
  tracked_by_debank: true,
  supported_by_gelato: false,
  rpc_uri: 'https://rpc.api.moonbeam.network',
  coingecko_id: 'moonbeam',
  nativeCurrency: {
    name: 'Moonbeam',
    symbol: 'GLMR',
    decimals: 18
  },
  blockExplorerUrls: ['https://moonscan.io']
};
var MOONBEAM_MOONBASE = {
  id: 'moonbeam_moonbase',
  chain_id: 1287,
  name: 'Moonbase',
  symbol: 'MOONBASE',
  mainnet: false,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/mobm.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://rpc.api.moonbase.moonbeam.network',
  nativeCurrency: {
    name: 'Moonbase',
    symbol: 'DEV',
    decimals: 18
  },
  blockExplorerUrls: ['https://moonbase.moonscan.io']
};
var NEAR_MAINNET = {
  id: 'near_mainnet',
  chain_id: 329847900,
  name: 'Near',
  symbol: "NEAR",
  mainnet: true,
  evm: false,
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://rpc.mainnet.near.org',
  png_symbol: 'PNR',
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/near.svg',
  contracts: {
    png: 'png-token-v1.testnet',
    factory: 'example2.near',
    router: 'example3.near',
    wrapped_native_token: 'wrap.near',
    local_multisig: 'example5.near',
    community_treasury: 'example6.near',
    treasury_vester: 'example7.near',
    mini_chef: {
      address: 'example8.near',
      active: true,
      type: ChefType.NEAR_CHEF
    },
    airdrop: {
      address: 'example9.near',
      active: false,
      type: AirdropType.NEAR_AIRDROP
    },
    timelock: 'example10.near',
    governor: 'example11.near',
    migrator: 'example12.near',
    multicall: ''
  },
  nativeCurrency: {
    name: 'Near',
    symbol: 'NEAR',
    decimals: 18
  },
  blockExplorerUrls: ['https://explorer.near.org']
};
var NEAR_TESTNET = {
  id: 'near_testnet',
  chain_id: 329847901,
  name: 'Near',
  symbol: "NEAR",
  mainnet: false,
  evm: false,
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://rpc.testnet.near.org',
  png_symbol: 'PNR',
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/near.svg',
  contracts: {
    png: 'png-token-v1.testnet',
    factory: 'example2.near',
    router: 'example3.near',
    wrapped_native_token: 'wrap.testnet',
    local_multisig: 'example5.near',
    community_treasury: 'example6.near',
    treasury_vester: 'example7.near',
    mini_chef: {
      address: 'example8.near',
      active: true,
      type: ChefType.NEAR_CHEF
    },
    airdrop: {
      address: 'example9.near',
      active: false,
      type: AirdropType.NEAR_AIRDROP
    },
    timelock: 'example10.near',
    governor: 'example11.near',
    migrator: 'example12.near',
    multicall: ''
  },
  nativeCurrency: {
    name: 'Near',
    symbol: 'NEAR',
    decimals: 18
  },
  blockExplorerUrls: ['https://explorer.testnet.near.org']
};
var OEC_MAINNET = {
  id: 'oec_mainnet',
  chain_id: 66,
  name: 'OEC',
  symbol: 'OKT',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/okt.png',
  pangolin_is_live: false,
  tracked_by_debank: true,
  supported_by_gelato: false,
  rpc_uri: 'https://exchainrpc.okex.org',
  coingecko_id: 'okex-chain',
  nativeCurrency: {
    name: 'OEC',
    symbol: 'OKT',
    decimals: 18
  },
  blockExplorerUrls: ['https://www.oklink.com/okexchain']
};
var OEC_TESTNET = {
  id: 'oec_testnet',
  chain_id: 65,
  name: 'OEC Testnet',
  symbol: 'OKT',
  mainnet: false,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/okt.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://exchaintestrpc.okex.org',
  nativeCurrency: {
    name: 'OEC',
    symbol: 'OKT',
    decimals: 18
  },
  blockExplorerUrls: ['https://www.oklink.com/oec-test']
};
var OP_MAINNET = {
  id: 'op_mainnet',
  chain_id: 10,
  name: 'Optimism',
  symbol: 'OP',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/op.png',
  pangolin_is_live: false,
  tracked_by_debank: true,
  supported_by_gelato: false,
  rpc_uri: 'https://mainnet.optimism.io',
  coingecko_id: 'optimistic-ethereum',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18
  },
  blockExplorerUrls: ['https://optimistic.etherscan.io']
};
var OP_KOVAN = {
  id: 'op_kovan',
  chain_id: 69,
  name: 'Optimism Kovan',
  symbol: 'OP',
  mainnet: false,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/op.png',
  pangolin_is_live: false,
  tracked_by_debank: true,
  supported_by_gelato: false,
  rpc_uri: 'https://kovan.optimism.io',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18
  },
  blockExplorerUrls: ['https://kovan-optimistic.etherscan.io']
};
var POLYGON_MAINNET = {
  id: 'polygon_mainnet',
  chain_id: 137,
  name: 'Polygon',
  symbol: 'MATIC',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/matic.png',
  pangolin_is_live: false,
  tracked_by_debank: true,
  supported_by_gelato: true,
  rpc_uri: 'https://polygon-rpc.com',
  coingecko_id: 'polygon-pos',
  nativeCurrency: {
    name: 'Polygon',
    symbol: 'MATIC',
    decimals: 18
  },
  blockExplorerUrls: ['https://polygonscan.com']
};
var POLYGON_MUMBAI = {
  id: 'polygon_mumbai',
  chain_id: 80001,
  name: 'Polygon Mumbai',
  symbol: 'MATIC',
  mainnet: false,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/matic.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: true,
  rpc_uri: 'https://matic-mumbai.chainstacklabs.com',
  contracts: {
    png: '0x4828a3D98E428e73184374845f23C40eB76bA695',
    factory: '0xf7b351C98B5585b7aDa089F3fFD0fED785fB6cff',
    router: '0x680ad00c72B8d55436E2812Df0f5a9Df7675e054',
    wrapped_native_token: '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
    local_multisig: '0x2412CF7162500001035B34a4aC4Cf4876B9a6f4b',
    foundation_multisig: '0x9284868361460C0Ca3dfcDcf035e90F0ea3A72A0',
    joint_multisig: '0x38F6d835FAF60a891016b2FC5692E76D2c6eEcbF',
    community_treasury: '0x791d828FA611D5cD086e8047EAa8d7276c8d943E',
    treasury_vester: '0xFeC5354eF11981D5dAF92F6CA61e618c5AdF4FD5',
    mini_chef: {
      address: '0xa34Ad412652267FB3b1261D7d4F351a678B01Bf8',
      active: true,
      type: ChefType.MINI_CHEF_V2
    },
    airdrop: {
      address: '0x34338ad5D7fd49B24D07D1D8e8d38Fc64F42f94A',
      active: false,
      type: AirdropType.LEGACY
    },
    timelock: '0xE6ec3b8AD6ad20210a2698d89016DDF6965E5fBC',
    revenue_distributor: '0x780A51831dc1cE3AAD2879479dBE9419e834744c',
    fee_collector: '0xB2FcD54680150e3033A878cf1F689e1256d51fc5',
    multicall: '',
    staking: [{
      address: '0x3AA2baD17b768fFe5F9Fa05Ca95f97959862B41B',
      active: true,
      reward_token: '0x4828a3D98E428e73184374845f23C40eB76bA695',
      type: StakingType.LEGACY
    }]
  },
  nativeCurrency: {
    name: 'Polygon',
    symbol: 'MATIC',
    decimals: 18
  },
  blockExplorerUrls: ['https://mumbai.polygonscan.com']
};
var SONGBIRD_CANARY = {
  id: 'songbird_canary',
  chain_id: 19,
  name: 'Songbird',
  symbol: 'SGB',
  png_symbol: 'PSB',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/sgb.png',
  pangolin_is_live: true,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://sgb.ftso.com.au/ext/bc/C/rpc',
  contracts: {
    png: '0xb2987753D1561570f726Aa373F48E77e27aa5FF4',
    factory: '0xB66E62b25c42D55655a82F8ebf699f2266f329FB',
    router: '0x6591cf4E1CfDDEcB4Aa5946c033596635Ba6FB0F',
    wrapped_native_token: '0x02f0826ef6aD107Cfc861152B32B52fD11BaB9ED',
    local_multisig: '0xe18dFC20edE326930d11b3316E92bdC1F606dc94',
    community_treasury: '0xA2e6eFFdbb278744E286F602Bfaa2BcDAccBb1AA',
    treasury_vester: '0x47d3d75E68594960845Bb3fD89f6a73E0Af8093E',
    mini_chef: {
      address: '0x76489156Fff6f4B89626f58386366941150642B7',
      active: true,
      type: ChefType.PANGO_CHEF
    },
    airdrop: {
      address: '0x1c4429A271ec5E36a2FDc6400A5a6e49E605dF17',
      active: true,
      type: AirdropType.MERKLE_TO_STAKING
    },
    timelock: '0xF92F8A011A55C243CBAA096A62d9C48880070af6',
    fee_collector: '0x7d84e8A7c89F84a97a0e190B45E4D2fC27412894',
    multicall: '0x17032Ea9c3a13Ed337665145364c0d2aD1108c91',
    staking: [{
      address: '0x7428A089A79B24400a620F1Cbf8bd0526cFae777',
      active: true,
      reward_token: '0xb2987753D1561570f726Aa373F48E77e27aa5FF4',
      type: StakingType.SAR_POSITIONS
    }]
  },
  nativeCurrency: {
    name: 'Songbird',
    symbol: 'SGB',
    decimals: 18
  },
  blockExplorerUrls: ['https://songbird-explorer.flare.network']
};
var FLARE_MAINNET = {
  id: 'flare_mainnet',
  chain_id: 14,
  name: 'Flare',
  symbol: 'FLR',
  png_symbol: 'PFL',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/flare.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://flare-api.flare.network/ext/C/rpc',
  nativeCurrency: {
    name: 'Flare',
    symbol: 'FLR',
    decimals: 18
  },
  blockExplorerUrls: ['https://flare-explorer.flare.network']
};
var WAGMI_FUJI_SUBNET = {
  id: 'wagmi_fuji_subnet',
  chain_id: 11111,
  name: 'Wagmi',
  symbol: 'WGMI',
  png_symbol: 'wagmiPNG',
  mainnet: false,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/wgmi.png',
  pangolin_is_live: true,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://subnets.avax.network/wagmi/wagmi-chain-testnet/rpc',
  contracts: {
    png: '0xbdf33c7128fBB220fc0e4Be277697cEeef8BdfF5',
    factory: '0xee2162F7A04f3abA4925BfdC2e262533bd6Be516',
    router: '0x924ec1B00109D355Bb2Aa045fAC3b08ceB70Fa3d',
    wrapped_native_token: '0x3Ee7094DADda15810F191DD6AcF7E4FFa37571e4',
    local_multisig: '0x0000000000000000000000000000000000000000',
    community_treasury: '0x2CE6B673aDB3032A1694daC7c1F07c345F18Ae2d',
    treasury_vester: '0x9DB06A311B3c06D0841782BA0D5004CDEA96e21A',
    mini_chef: {
      address: '0x3014526b462ceef5734d9AaAe24321769E59269a',
      active: true,
      type: ChefType.MINI_CHEF_V2
    },
    airdrop: {
      address: '0x0BD8b5D5FF2d4FCcDf7782Af15368FcAFE040Bd1',
      active: false,
      type: AirdropType.LEGACY
    },
    timelock: '0x2d41E2CDf9E74686d89e4A0BeA5dD4D01F7D134e',
    governor: '0x0000000000000000000000000000000000000000',
    migrator: '0x0000000000000000000000000000000000000000',
    multicall: '0x5138349f3027F1e2c2f10eDAD83d38096C0D8Abe',
    staking: [{
      address: '0x4C08b0D7F51A27db7baFb8Dc4632494Df8d53Af8',
      active: true,
      reward_token: '0xbdf33c7128fBB220fc0e4Be277697cEeef8BdfF5',
      type: StakingType.LEGACY
    }, {
      address: '0xf9E3691617151969f30b0Da57AA0c9f4698ef6ab',
      active: true,
      reward_token: '0xbdf33c7128fBB220fc0e4Be277697cEeef8BdfF5',
      type: StakingType.SAR_POSITIONS
    }]
  },
  nativeCurrency: {
    name: 'Wagmi',
    symbol: 'WGMI',
    decimals: 18
  },
  blockExplorerUrls: ['https://subnets.avax.network/wagmi/wagmi-chain-testnet/explorer']
};
var XDAI_MAINNET = {
  id: 'xdai_mainnet',
  chain_id: 100,
  name: 'Gnosis',
  symbol: 'XDAI',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/xdai.png',
  pangolin_is_live: false,
  tracked_by_debank: true,
  supported_by_gelato: false,
  rpc_uri: 'https://rpc.xdaichain.com',
  coingecko_id: 'xdai',
  nativeCurrency: {
    name: 'Gnosis',
    symbol: 'xDAI',
    decimals: 18
  },
  blockExplorerUrls: ['https://blockscout.com/xdai/mainnet']
};
var EWC_MAINNET = {
  id: 'ewc_mainnet',
  chain_id: 246,
  name: 'Energy Web Chain',
  symbol: 'EWT',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/ewc.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://rpc.energyweb.org',
  nativeCurrency: {
    name: 'Energy Web Token',
    symbol: 'EWT',
    decimals: 18
  },
  blockExplorerUrls: ['http://explorer.energyweb.org']
};
var EWC_TESTNET = {
  id: 'ewc_testnet',
  chain_id: 73799,
  name: 'Volta',
  symbol: 'VT',
  mainnet: false,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/ewc.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://volta-rpc.energyweb.org',
  nativeCurrency: {
    name: 'Volta',
    symbol: 'VT',
    decimals: 18
  },
  blockExplorerUrls: ['http://volta-aexplorer.energyweb.org']
};
var IOTEX_MAINNET = {
  id: 'iotex_mainnet',
  chain_id: 4689,
  name: 'IoTex Mainnet',
  symbol: 'IOTX',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/iotx.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://babel-api.mainnet.iotex.io',
  coingecko_id: 'iotex',
  nativeCurrency: {
    name: 'IoTex',
    symbol: 'IOTX',
    decimals: 18
  },
  blockExplorerUrls: ['https://iotexscan.io']
};
var IOTEX_TESTNET = {
  id: 'iotex_testnet',
  chain_id: 4690,
  name: 'IoTex Testnet',
  symbol: 'IOTX',
  mainnet: false,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/iotx.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://babel-api.testnet.iotex.io',
  nativeCurrency: {
    name: 'IoTex',
    symbol: 'IOTX',
    decimals: 18
  },
  blockExplorerUrls: ['https://testnet.iotexscan.io']
};
var ASTAR_MAINNET = {
  id: 'astar_mainnet',
  chain_id: 592,
  name: 'Astar Network',
  symbol: 'ASTR',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/astr.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://astar.api.onfinality.io/public',
  nativeCurrency: {
    name: 'Astar',
    symbol: 'ASTL',
    decimals: 18
  },
  blockExplorerUrls: ['https://blockscout.com/astar']
};
var SHIDEN_MAINNET = {
  id: 'astar_shiden_testnet',
  chain_id: 336,
  name: 'Shiden Network',
  symbol: 'SDN',
  mainnet: false,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/astr.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://shiden.api.onfinality.io/public',
  nativeCurrency: {
    name: 'Shiden',
    symbol: 'SDN',
    decimals: 18
  },
  blockExplorerUrls: ['https://blockscout.com/shiden']
};
var SHIBUYA_TESTNET = {
  id: 'astar_shibuya_testnet',
  chain_id: 81,
  name: 'Shibuya Network',
  symbol: 'SBY',
  mainnet: false,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/astr.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://rpc.shibuya.astar.network:8545',
  nativeCurrency: {
    name: 'Shibuya',
    symbol: 'SBY',
    decimals: 18
  },
  blockExplorerUrls: ['https://blockscout.com/shibuya']
};
var TELOS_MAINNET = {
  id: 'telos_mainnet',
  chain_id: 40,
  name: 'Telos',
  symbol: 'TLOS',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/telos.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://mainnet.telos.net/evm',
  coingecko_id: 'telos',
  nativeCurrency: {
    name: 'TELOS',
    symbol: 'TLOS',
    decimals: 18
  },
  blockExplorerUrls: ['https://www.teloscan.io']
};
var TELOS_TESTNET = {
  id: 'telos_testnet',
  chain_id: 41,
  name: 'Telos Testnet',
  symbol: 'TLOS',
  mainnet: false,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/telos.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://testnet.telos.net/evm',
  nativeCurrency: {
    name: 'TELOS',
    symbol: 'TLOS',
    decimals: 18
  },
  blockExplorerUrls: ['https://testnet.telos.net/v2/explore']
};
var OASIS_MAINNET = {
  id: 'oasis_mainnet',
  chain_id: 42262,
  name: 'Oasis Emerald',
  symbol: 'ROSE',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/oasis.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://emerald.oasis.dev',
  coingecko_id: 'oasis',
  nativeCurrency: {
    name: 'Oasis Network',
    symbol: 'ROSE',
    decimals: 18
  },
  blockExplorerUrls: ['https://explorer.emerald.oasis.dev']
};
var OASIS_TESTNET = {
  id: 'oasis_testnet',
  chain_id: 42261,
  name: 'Oasis Emerald Testnet',
  symbol: 'ROSE',
  mainnet: false,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/oasis.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://testnet.emerald.oasis.dev',
  nativeCurrency: {
    name: 'Oasis Network',
    symbol: 'ROSE',
    decimals: 18
  },
  blockExplorerUrls: ['https://testnet.explorer.emerald.oasis.dev']
};
var GODWOKEN_MAINNET = {
  id: 'godwoken_mainnet',
  chain_id: 71394,
  name: 'Godwoken Testnet',
  symbol: 'CKB',
  mainnet: true,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/godwoken.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://mainnet.godwoken.io/rpc/eth-wallet',
  nativeCurrency: {
    name: 'Nervos Network',
    symbol: 'CKB',
    decimals: 18
  },
  blockExplorerUrls: ['https://gwscan.com']
};
var GODWOKEN_TESTNET = {
  id: 'godwoken_mainnet',
  chain_id: 71393,
  name: 'Godwoken Testnet',
  symbol: 'CKB',
  mainnet: false,
  evm: true,
  logo: 'https://raw.githubusercontent.com/pangolindex/sdk/master/src/images/chains/godwoken.png',
  pangolin_is_live: false,
  tracked_by_debank: false,
  supported_by_gelato: false,
  rpc_uri: 'https://godwoken-testnet-web3-v1-rpc.ckbapp.dev/',
  nativeCurrency: {
    name: 'Nervos Network',
    symbol: 'CKB',
    decimals: 18
  },
  blockExplorerUrls: ['https://aggron.gwscan.com/en-US']
};
var CHAINS = (_CHAINS = {}, _CHAINS[ChainId.FUJI] = AVALANCHE_FUJI, _CHAINS[ChainId.AVALANCHE] = AVALANCHE_MAINNET, _CHAINS[ChainId.WAGMI] = WAGMI_FUJI_SUBNET, _CHAINS[ChainId.COSTON] = COSTON_TESTNET, _CHAINS[ChainId.SONGBIRD] = SONGBIRD_CANARY, _CHAINS[ChainId.NEAR_MAINNET] = NEAR_MAINNET, _CHAINS[ChainId.NEAR_TESTNET] = NEAR_TESTNET, _CHAINS);
var ALL_CHAINS = [ETHEREUM_MAINNET, ARBITRUM_MAINNET, ARBITRUM_RINKEBY, AURORA_MAINNET, AURORA_TESTNET, AVALANCHE_MAINNET, AVALANCHE_FUJI, BOBA_MAINNET, BITTORRENT_MAINNET, BSC_MAINNET, BSC_TESTNET, CELO_MAINNET, CELO_ALFAJORES_TESTNET, CELO_BAKLAVA_TESTNET, COSTON_TESTNET, CRONOS_MAINNET, CRONOS_TESTNET, EVMOS_MAINNET, EVMOS_TESTNET, FANTOM_MAINNET, FANTOM_TESTNET, FUSE_MAINNET, FUSE_TESTNET, HARMONY_MAINNET, HARMONY_TESTNET, HECO_MAINNET, HECO_TESTNET, KLAYTN_MAINNET, KLAYTN_BAOBAB, METIS_MAINNET, METIS_RINKEBY, MOONRIVER_MAINNET, MOONBEAM_MAINNET, MOONBEAM_MOONBASE, OEC_MAINNET, OEC_TESTNET, OP_MAINNET, OP_KOVAN, POLYGON_MAINNET, POLYGON_MUMBAI, SONGBIRD_CANARY, WAGMI_FUJI_SUBNET, XDAI_MAINNET, EWC_MAINNET, EWC_TESTNET, IOTEX_MAINNET, IOTEX_TESTNET, ASTAR_MAINNET, SHIDEN_MAINNET, SHIBUYA_TESTNET, TELOS_MAINNET, TELOS_TESTNET, OASIS_MAINNET, OASIS_TESTNET, GODWOKEN_MAINNET, GODWOKEN_TESTNET];

var _FACTORY_ADDRESS, _SOLIDITY_TYPE_MAXIMA;
var TradeType;

(function (TradeType) {
  TradeType[TradeType["EXACT_INPUT"] = 0] = "EXACT_INPUT";
  TradeType[TradeType["EXACT_OUTPUT"] = 1] = "EXACT_OUTPUT";
})(TradeType || (TradeType = {}));

var Rounding;

(function (Rounding) {
  Rounding[Rounding["ROUND_DOWN"] = 0] = "ROUND_DOWN";
  Rounding[Rounding["ROUND_HALF_UP"] = 1] = "ROUND_HALF_UP";
  Rounding[Rounding["ROUND_UP"] = 2] = "ROUND_UP";
})(Rounding || (Rounding = {}));

var FACTORY_ADDRESS = (_FACTORY_ADDRESS = {}, _FACTORY_ADDRESS[ChainId.FUJI] = CHAINS[ChainId.FUJI].contracts.factory, _FACTORY_ADDRESS[ChainId.AVALANCHE] = CHAINS[ChainId.AVALANCHE].contracts.factory, _FACTORY_ADDRESS[ChainId.WAGMI] = CHAINS[ChainId.WAGMI].contracts.factory, _FACTORY_ADDRESS[ChainId.COSTON] = CHAINS[ChainId.COSTON].contracts.factory, _FACTORY_ADDRESS[ChainId.SONGBIRD] = CHAINS[ChainId.SONGBIRD].contracts.factory, _FACTORY_ADDRESS[ChainId.NEAR_MAINNET] = CHAINS[ChainId.NEAR_MAINNET].contracts.factory, _FACTORY_ADDRESS[ChainId.NEAR_TESTNET] = CHAINS[ChainId.NEAR_TESTNET].contracts.factory, _FACTORY_ADDRESS);
var INIT_CODE_HASH = '0x40231f6b438bce0797c9ada29b718a87ea0a5cea3fe9a771abdd76bd41a3e545';
var MINIMUM_LIQUIDITY = /*#__PURE__*/JSBI.BigInt(1000); // exports for internal consumption

var ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
var ZERO = /*#__PURE__*/JSBI.BigInt(0);
var ONE = /*#__PURE__*/JSBI.BigInt(1);
var TWO = /*#__PURE__*/JSBI.BigInt(2);
var THREE = /*#__PURE__*/JSBI.BigInt(3);
var FIVE = /*#__PURE__*/JSBI.BigInt(5);
var TEN = /*#__PURE__*/JSBI.BigInt(10);
var _100 = /*#__PURE__*/JSBI.BigInt(100);
var _997 = /*#__PURE__*/JSBI.BigInt(997);
var _998 = /*#__PURE__*/JSBI.BigInt(998);
var _1000 = /*#__PURE__*/JSBI.BigInt(1000);
var SolidityType;

(function (SolidityType) {
  SolidityType["uint8"] = "uint8";
  SolidityType["uint256"] = "uint256";
})(SolidityType || (SolidityType = {}));

var SOLIDITY_TYPE_MAXIMA = (_SOLIDITY_TYPE_MAXIMA = {}, _SOLIDITY_TYPE_MAXIMA[SolidityType.uint8] = /*#__PURE__*/JSBI.BigInt('0xff'), _SOLIDITY_TYPE_MAXIMA[SolidityType.uint256] = /*#__PURE__*/JSBI.BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'), _SOLIDITY_TYPE_MAXIMA);

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      return function () {
        if (i >= o.length) return {
          done: true
        };
        return {
          done: false,
          value: o[i++]
        };
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  it = o[Symbol.iterator]();
  return it.next.bind(it);
}

// see https://stackoverflow.com/a/41102306
var CAN_SET_PROTOTYPE = ('setPrototypeOf' in Object);
/**
 * Indicates that the pair has insufficient reserves for a desired output amount. I.e. the amount of output cannot be
 * obtained by sending any amount of input.
 */

var InsufficientReservesError = /*#__PURE__*/function (_Error) {
  _inheritsLoose(InsufficientReservesError, _Error);

  function InsufficientReservesError() {
    var _this;

    _this = _Error.call(this) || this;
    _this.isInsufficientReservesError = true;
    _this.name = _this.constructor.name;
    if (CAN_SET_PROTOTYPE) Object.setPrototypeOf(_assertThisInitialized(_this), (this instanceof InsufficientReservesError ? this.constructor : void 0).prototype);
    return _this;
  }

  return InsufficientReservesError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
 * Indicates that the input amount is too small to produce any amount of output. I.e. the amount of input sent is less
 * than the price of a single unit of output after fees.
 */

var InsufficientInputAmountError = /*#__PURE__*/function (_Error2) {
  _inheritsLoose(InsufficientInputAmountError, _Error2);

  function InsufficientInputAmountError() {
    var _this2;

    _this2 = _Error2.call(this) || this;
    _this2.isInsufficientInputAmountError = true;
    _this2.name = _this2.constructor.name;
    if (CAN_SET_PROTOTYPE) Object.setPrototypeOf(_assertThisInitialized(_this2), (this instanceof InsufficientInputAmountError ? this.constructor : void 0).prototype);
    return _this2;
  }

  return InsufficientInputAmountError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
 * Indicates that the pool method is not supported for the particular implementation
 */

var MethodNotSupported = /*#__PURE__*/function (_Error3) {
  _inheritsLoose(MethodNotSupported, _Error3);

  function MethodNotSupported() {
    var _this3;

    _this3 = _Error3.call(this) || this;
    _this3.isMethodNotSupportedError = true;
    _this3.name = _this3.constructor.name;
    if (CAN_SET_PROTOTYPE) Object.setPrototypeOf(_assertThisInitialized(_this3), (this instanceof MethodNotSupported ? this.constructor : void 0).prototype);
    return _this3;
  }

  return MethodNotSupported;
}( /*#__PURE__*/_wrapNativeSuper(Error));

function validateSolidityTypeInstance(value, solidityType) {
  !JSBI.greaterThanOrEqual(value, ZERO) ? process.env.NODE_ENV !== "production" ? invariant(false, value + " is not a " + solidityType + ".") : invariant(false) : void 0;
  !JSBI.lessThanOrEqual(value, SOLIDITY_TYPE_MAXIMA[solidityType]) ? process.env.NODE_ENV !== "production" ? invariant(false, value + " is not a " + solidityType + ".") : invariant(false) : void 0;
} // warns if addresses are not checksummed

function validateAndParseAddress(address) {
  try {
    var checksummedAddress = getAddress(address);
    process.env.NODE_ENV !== "production" ? warning(address === checksummedAddress, address + " is not checksummed.") : void 0;
    return checksummedAddress;
  } catch (error) {
     process.env.NODE_ENV !== "production" ? invariant(false, address + " is not a valid address.") : invariant(false) ;
  }
}
function parseBigintIsh(bigintIsh) {
  return bigintIsh instanceof JSBI ? bigintIsh : typeof bigintIsh === 'bigint' ? JSBI.BigInt(bigintIsh.toString()) : JSBI.BigInt(bigintIsh);
} // mock the on-chain sqrt function

function sqrt(y) {
  validateSolidityTypeInstance(y, SolidityType.uint256);
  var z = ZERO;
  var x;

  if (JSBI.greaterThan(y, THREE)) {
    z = y;
    x = JSBI.add(JSBI.divide(y, TWO), ONE);

    while (JSBI.lessThan(x, z)) {
      z = x;
      x = JSBI.divide(JSBI.add(JSBI.divide(y, x), x), TWO);
    }
  } else if (JSBI.notEqual(y, ZERO)) {
    z = ONE;
  }

  return z;
}
function abs(x) {
  if (JSBI.lessThan(x, ZERO)) return JSBI.multiply(x, JSBI.BigInt(-1));else return x;
} // given an array of items sorted by `comparator`, insert an item into its sort index and constrain the size to
// `maxSize` by removing the last item

function sortedInsert(items, add, maxSize, comparator) {
  !(maxSize > 0) ? process.env.NODE_ENV !== "production" ? invariant(false, 'MAX_SIZE_ZERO') : invariant(false) : void 0; // this is an invariant because the interface cannot return multiple removed items if items.length exceeds maxSize

  !(items.length <= maxSize) ? process.env.NODE_ENV !== "production" ? invariant(false, 'ITEMS_SIZE') : invariant(false) : void 0; // short circuit first item add

  if (items.length === 0) {
    items.push(add);
    return null;
  } else {
    var isFull = items.length === maxSize; // short circuit if full and the additional item does not come before the last item

    if (isFull && comparator(items[items.length - 1], add) <= 0) {
      return add;
    }

    var lo = 0,
        hi = items.length;

    while (lo < hi) {
      var mid = lo + hi >>> 1;

      if (comparator(items[mid], add) <= 0) {
        lo = mid + 1;
      } else {
        hi = mid;
      }
    }

    items.splice(lo, 0, add);
    return isFull ? items.pop() : null;
  }
}

var _Currency$CURRENCY;
/**
 * A currency is any fungible financial instrument on Ethereum, including Ether and all ERC20 tokens.
 *
 * The only instance of the base class `Currency` is Ether.
 */

var Currency =
/**
 * Constructs an instance of the base class `Currency`. The only instance of the base class `Currency` is `Currency.ETHER`.
 * @param decimals decimals of the currency
 * @param symbol symbol of the currency
 * @param name of the currency
 */
function Currency(decimals, symbol, name) {
  validateSolidityTypeInstance(JSBI.BigInt(decimals), SolidityType.uint8);
  this.decimals = decimals;
  this.symbol = symbol;
  this.name = name;
};
/**
 * The only instance of the base class `Currency`.
 */
//$ public static readonly CAVAX: Currency = new Currency(18, 'AVAX', 'Avalanche')

Currency.CURRENCY = (_Currency$CURRENCY = {}, _Currency$CURRENCY[ChainId.FUJI] = /*#__PURE__*/new Currency(18, CHAINS[ChainId.FUJI].symbol, CHAINS[ChainId.FUJI].name), _Currency$CURRENCY[ChainId.AVALANCHE] = /*#__PURE__*/new Currency(18, CHAINS[ChainId.AVALANCHE].symbol, CHAINS[ChainId.AVALANCHE].name), _Currency$CURRENCY[ChainId.WAGMI] = /*#__PURE__*/new Currency(18, CHAINS[ChainId.WAGMI].symbol, CHAINS[ChainId.WAGMI].name), _Currency$CURRENCY[ChainId.COSTON] = /*#__PURE__*/new Currency(18, CHAINS[ChainId.COSTON].symbol, CHAINS[ChainId.COSTON].name), _Currency$CURRENCY[ChainId.SONGBIRD] = /*#__PURE__*/new Currency(18, CHAINS[ChainId.SONGBIRD].symbol, CHAINS[ChainId.SONGBIRD].name), _Currency$CURRENCY[ChainId.NEAR_MAINNET] = /*#__PURE__*/new Currency(24, CHAINS[ChainId.NEAR_MAINNET].symbol, CHAINS[ChainId.NEAR_MAINNET].name), _Currency$CURRENCY[ChainId.NEAR_TESTNET] = /*#__PURE__*/new Currency(24, CHAINS[ChainId.NEAR_TESTNET].symbol, CHAINS[ChainId.NEAR_TESTNET].name), _Currency$CURRENCY); //$ const CAVAX = Currency.CAVAX

var CAVAX = Currency.CURRENCY;

var _WAVAX;
/**
 * Represents an ERC20 token with a unique address and some metadata.
 */

var Token = /*#__PURE__*/function (_Currency) {
  _inheritsLoose(Token, _Currency);

  function Token(chainId, address, decimals, symbol, name) {
    var _CHAINS$chainId;

    var _this;

    if (chainId === void 0) {
      chainId = ChainId.AVALANCHE;
    }

    _this = _Currency.call(this, decimals, symbol, name) || this;
    _this.chainId = ChainId.AVALANCHE;
    _this.chainId = chainId; // only validate address for evm chains

    var shouldValidateAddress = !!((_CHAINS$chainId = CHAINS[chainId]) !== null && _CHAINS$chainId !== void 0 && _CHAINS$chainId.evm);
    _this.address = shouldValidateAddress ? validateAndParseAddress(address) : address;
    return _this;
  }
  /**
   * Returns true if the two tokens are equivalent, i.e. have the same chainId and address.
   * @param other other token to compare
   */


  var _proto = Token.prototype;

  _proto.equals = function equals(other) {
    // short circuit on reference equality
    if (this === other) {
      return true;
    }

    return this.chainId === other.chainId && this.address === other.address;
  }
  /**
   * Returns true if the address of this token sorts before the address of the other token
   * @param other other token to compare
   * @throws if the tokens have the same address
   * @throws if the tokens are on different chains
   */
  ;

  _proto.sortsBefore = function sortsBefore(other) {
    !(this.chainId === other.chainId) ? process.env.NODE_ENV !== "production" ? invariant(false, 'CHAIN_IDS') : invariant(false) : void 0;
    !(this.address !== other.address) ? process.env.NODE_ENV !== "production" ? invariant(false, 'ADDRESSES') : invariant(false) : void 0;
    return this.address.toLowerCase() < other.address.toLowerCase();
  };

  return Token;
}(Currency);
/**
 * Compares two currencies for equality
 */

function currencyEquals(currencyA, currencyB) {
  if (currencyA instanceof Token && currencyB instanceof Token) {
    return currencyA.equals(currencyB);
  } else if (currencyA instanceof Token) {
    return false;
  } else if (currencyB instanceof Token) {
    return false;
  } else {
    return currencyA === currencyB;
  }
}
var WAVAX = (_WAVAX = {}, _WAVAX[ChainId.FUJI] = /*#__PURE__*/new Token(ChainId.FUJI, CHAINS[ChainId.FUJI].contracts.wrapped_native_token, 18, 'WAVAX', 'Wrapped AVAX'), _WAVAX[ChainId.AVALANCHE] = /*#__PURE__*/new Token(ChainId.AVALANCHE, CHAINS[ChainId.AVALANCHE].contracts.wrapped_native_token, 18, 'WAVAX', 'Wrapped AVAX'), _WAVAX[ChainId.WAGMI] = /*#__PURE__*/new Token(ChainId.WAGMI, CHAINS[ChainId.WAGMI].contracts.wrapped_native_token, 18, 'wWAGMI', 'Wrapped WAGMI'), _WAVAX[ChainId.COSTON] = /*#__PURE__*/new Token(ChainId.COSTON, CHAINS[ChainId.COSTON].contracts.wrapped_native_token, 18, 'WCFLR', 'Wrapped CostonFlare'), _WAVAX[ChainId.SONGBIRD] = /*#__PURE__*/new Token(ChainId.SONGBIRD, CHAINS[ChainId.SONGBIRD].contracts.wrapped_native_token, 18, 'wWSGB', 'Wrapped Songbird'), _WAVAX[ChainId.NEAR_MAINNET] = /*#__PURE__*/new Token(ChainId.NEAR_MAINNET, CHAINS[ChainId.NEAR_MAINNET].contracts.wrapped_native_token, 24, 'wNEAR', 'Wrapped NEAR'), _WAVAX[ChainId.NEAR_TESTNET] = /*#__PURE__*/new Token(ChainId.NEAR_TESTNET, CHAINS[ChainId.NEAR_TESTNET].contracts.wrapped_native_token, 24, 'wNEAR', 'Wrapped NEAR'), _WAVAX);

var _toSignificantRoundin, _toFixedRounding;
var Decimal = /*#__PURE__*/toFormat(_Decimal);
var Big = /*#__PURE__*/toFormat(_Big);
var toSignificantRounding = (_toSignificantRoundin = {}, _toSignificantRoundin[Rounding.ROUND_DOWN] = Decimal.ROUND_DOWN, _toSignificantRoundin[Rounding.ROUND_HALF_UP] = Decimal.ROUND_HALF_UP, _toSignificantRoundin[Rounding.ROUND_UP] = Decimal.ROUND_UP, _toSignificantRoundin);
var toFixedRounding = (_toFixedRounding = {}, _toFixedRounding[Rounding.ROUND_DOWN] = 0, _toFixedRounding[Rounding.ROUND_HALF_UP] = 1, _toFixedRounding[Rounding.ROUND_UP] = 3, _toFixedRounding);
var Fraction = /*#__PURE__*/function () {
  function Fraction(numerator, denominator) {
    if (denominator === void 0) {
      denominator = ONE;
    }

    this.numerator = parseBigintIsh(numerator);
    this.denominator = parseBigintIsh(denominator);
  } // performs floor division


  var _proto = Fraction.prototype;

  _proto.invert = function invert() {
    return new Fraction(this.denominator, this.numerator);
  };

  _proto.add = function add(other) {
    var otherParsed = other instanceof Fraction ? other : new Fraction(parseBigintIsh(other));

    if (JSBI.equal(this.denominator, otherParsed.denominator)) {
      return new Fraction(JSBI.add(this.numerator, otherParsed.numerator), this.denominator);
    }

    return new Fraction(JSBI.add(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(otherParsed.numerator, this.denominator)), JSBI.multiply(this.denominator, otherParsed.denominator));
  };

  _proto.subtract = function subtract(other) {
    var otherParsed = other instanceof Fraction ? other : new Fraction(parseBigintIsh(other));

    if (JSBI.equal(this.denominator, otherParsed.denominator)) {
      return new Fraction(JSBI.subtract(this.numerator, otherParsed.numerator), this.denominator);
    }

    return new Fraction(JSBI.subtract(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(otherParsed.numerator, this.denominator)), JSBI.multiply(this.denominator, otherParsed.denominator));
  };

  _proto.lessThan = function lessThan(other) {
    var otherParsed = other instanceof Fraction ? other : new Fraction(parseBigintIsh(other));
    return JSBI.lessThan(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(otherParsed.numerator, this.denominator));
  };

  _proto.equalTo = function equalTo(other) {
    var otherParsed = other instanceof Fraction ? other : new Fraction(parseBigintIsh(other));
    return JSBI.equal(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(otherParsed.numerator, this.denominator));
  };

  _proto.greaterThan = function greaterThan(other) {
    var otherParsed = other instanceof Fraction ? other : new Fraction(parseBigintIsh(other));
    return JSBI.greaterThan(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(otherParsed.numerator, this.denominator));
  };

  _proto.multiply = function multiply(other) {
    var otherParsed = other instanceof Fraction ? other : new Fraction(parseBigintIsh(other));
    return new Fraction(JSBI.multiply(this.numerator, otherParsed.numerator), JSBI.multiply(this.denominator, otherParsed.denominator));
  };

  _proto.divide = function divide(other) {
    var otherParsed = other instanceof Fraction ? other : new Fraction(parseBigintIsh(other));
    return new Fraction(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(this.denominator, otherParsed.numerator));
  };

  _proto.toSignificant = function toSignificant(significantDigits, format, rounding) {
    if (format === void 0) {
      format = {
        groupSeparator: ''
      };
    }

    if (rounding === void 0) {
      rounding = Rounding.ROUND_HALF_UP;
    }

    !Number.isInteger(significantDigits) ? process.env.NODE_ENV !== "production" ? invariant(false, significantDigits + " is not an integer.") : invariant(false) : void 0;
    !(significantDigits > 0) ? process.env.NODE_ENV !== "production" ? invariant(false, significantDigits + " is not positive.") : invariant(false) : void 0;
    Decimal.set({
      precision: significantDigits + 1,
      rounding: toSignificantRounding[rounding]
    });
    var quotient = new Decimal(this.numerator.toString()).div(this.denominator.toString()).toSignificantDigits(significantDigits);
    return quotient.toFormat(quotient.decimalPlaces(), format);
  };

  _proto.toFixed = function toFixed(decimalPlaces, format, rounding) {
    if (format === void 0) {
      format = {
        groupSeparator: ''
      };
    }

    if (rounding === void 0) {
      rounding = Rounding.ROUND_HALF_UP;
    }

    !Number.isInteger(decimalPlaces) ? process.env.NODE_ENV !== "production" ? invariant(false, decimalPlaces + " is not an integer.") : invariant(false) : void 0;
    !(decimalPlaces >= 0) ? process.env.NODE_ENV !== "production" ? invariant(false, decimalPlaces + " is negative.") : invariant(false) : void 0;
    Big.DP = decimalPlaces;
    Big.RM = toFixedRounding[rounding];
    return new Big(this.numerator.toString()).div(this.denominator.toString()).toFormat(decimalPlaces, format);
  };

  _createClass(Fraction, [{
    key: "quotient",
    get: function get() {
      return JSBI.divide(this.numerator, this.denominator);
    } // remainder after floor division

  }, {
    key: "remainder",
    get: function get() {
      return new Fraction(JSBI.remainder(this.numerator, this.denominator), this.denominator);
    }
  }]);

  return Fraction;
}();

var Big$1 = /*#__PURE__*/toFormat(_Big);
var CurrencyAmount = /*#__PURE__*/function (_Fraction) {
  _inheritsLoose(CurrencyAmount, _Fraction);

  // amount _must_ be raw, i.e. in the native representation
  function CurrencyAmount(currency, amount) {
    var _this;

    var parsedAmount = parseBigintIsh(amount);
    validateSolidityTypeInstance(parsedAmount, SolidityType.uint256);
    _this = _Fraction.call(this, parsedAmount, JSBI.exponentiate(TEN, JSBI.BigInt(currency.decimals))) || this;
    _this.currency = currency;
    return _this;
  }
  /**
   * Helper that calls the constructor with the ETHER currency
   * @param amount ether amount in wei
   * @param chainId
   */


  CurrencyAmount.ether = function ether(amount, chainId) {
    if (chainId === void 0) {
      chainId = ChainId.AVALANCHE;
    }

    return new CurrencyAmount(CAVAX[chainId], amount);
  };

  var _proto = CurrencyAmount.prototype;

  _proto.add = function add(other) {
    !currencyEquals(this.currency, other.currency) ? process.env.NODE_ENV !== "production" ? invariant(false, 'TOKEN') : invariant(false) : void 0;
    return new CurrencyAmount(this.currency, JSBI.add(this.raw, other.raw));
  };

  _proto.subtract = function subtract(other) {
    !currencyEquals(this.currency, other.currency) ? process.env.NODE_ENV !== "production" ? invariant(false, 'TOKEN') : invariant(false) : void 0;
    return new CurrencyAmount(this.currency, JSBI.subtract(this.raw, other.raw));
  };

  _proto.toSignificant = function toSignificant(significantDigits, format, rounding) {
    if (significantDigits === void 0) {
      significantDigits = 6;
    }

    if (rounding === void 0) {
      rounding = Rounding.ROUND_DOWN;
    }

    return _Fraction.prototype.toSignificant.call(this, significantDigits, format, rounding);
  };

  _proto.toFixed = function toFixed(decimalPlaces, format, rounding) {
    if (decimalPlaces === void 0) {
      decimalPlaces = this.currency.decimals;
    }

    if (rounding === void 0) {
      rounding = Rounding.ROUND_DOWN;
    }

    !(decimalPlaces <= this.currency.decimals) ? process.env.NODE_ENV !== "production" ? invariant(false, 'DECIMALS') : invariant(false) : void 0;
    return _Fraction.prototype.toFixed.call(this, decimalPlaces, format, rounding);
  };

  _proto.toExact = function toExact(format) {
    if (format === void 0) {
      format = {
        groupSeparator: ''
      };
    }

    Big$1.DP = this.currency.decimals;
    return new Big$1(this.numerator.toString()).div(this.denominator.toString()).toFormat(format);
  };

  _createClass(CurrencyAmount, [{
    key: "raw",
    get: function get() {
      return this.numerator;
    }
  }]);

  return CurrencyAmount;
}(Fraction);

var TokenAmount = /*#__PURE__*/function (_CurrencyAmount) {
  _inheritsLoose(TokenAmount, _CurrencyAmount);

  // amount _must_ be raw, i.e. in the native representation
  function TokenAmount(token, amount) {
    var _this;

    _this = _CurrencyAmount.call(this, token, amount) || this;
    _this.token = token;
    return _this;
  }

  var _proto = TokenAmount.prototype;

  _proto.add = function add(other) {
    !this.token.equals(other.token) ? process.env.NODE_ENV !== "production" ? invariant(false, 'TOKEN') : invariant(false) : void 0;
    return new TokenAmount(this.token, JSBI.add(this.raw, other.raw));
  };

  _proto.subtract = function subtract(other) {
    !this.token.equals(other.token) ? process.env.NODE_ENV !== "production" ? invariant(false, 'TOKEN') : invariant(false) : void 0;
    return new TokenAmount(this.token, JSBI.subtract(this.raw, other.raw));
  };

  return TokenAmount;
}(CurrencyAmount);

var Price = /*#__PURE__*/function (_Fraction) {
  _inheritsLoose(Price, _Fraction);

  // denominator and numerator _must_ be raw, i.e. in the native representation
  function Price(baseCurrency, quoteCurrency, denominator, numerator) {
    var _this;

    _this = _Fraction.call(this, numerator, denominator) || this;
    _this.baseCurrency = baseCurrency;
    _this.quoteCurrency = quoteCurrency;
    _this.scalar = new Fraction(JSBI.exponentiate(TEN, JSBI.BigInt(baseCurrency.decimals)), JSBI.exponentiate(TEN, JSBI.BigInt(quoteCurrency.decimals)));
    return _this;
  }

  Price.fromRoute = function fromRoute(route) {
    var prices = [];

    for (var _iterator = _createForOfIteratorHelperLoose(route.pools.entries()), _step; !(_step = _iterator()).done;) {
      var _step$value = _step.value,
          i = _step$value[0],
          pool = _step$value[1];
      prices.push(pool.priceOf(route.path[i], route.path[i + 1]));
    }

    return prices.slice(1).reduce(function (accumulator, currentValue) {
      return accumulator.multiply(currentValue);
    }, prices[0]);
  };

  var _proto = Price.prototype;

  _proto.invert = function invert() {
    return new Price(this.quoteCurrency, this.baseCurrency, this.numerator, this.denominator);
  };

  _proto.multiply = function multiply(other) {
    !currencyEquals(this.quoteCurrency, other.baseCurrency) ? process.env.NODE_ENV !== "production" ? invariant(false, 'TOKEN') : invariant(false) : void 0;

    var fraction = _Fraction.prototype.multiply.call(this, other);

    return new Price(this.baseCurrency, other.quoteCurrency, fraction.denominator, fraction.numerator);
  } // performs floor division on overflow
  ;

  _proto.quote = function quote(currencyAmount, chainId) {
    if (chainId === void 0) {
      chainId = ChainId.AVALANCHE;
    }

    !currencyEquals(currencyAmount.currency, this.baseCurrency) ? process.env.NODE_ENV !== "production" ? invariant(false, 'TOKEN') : invariant(false) : void 0;

    if (this.quoteCurrency instanceof Token) {
      return new TokenAmount(this.quoteCurrency, _Fraction.prototype.multiply.call(this, currencyAmount.raw).quotient);
    }

    return CurrencyAmount.ether(_Fraction.prototype.multiply.call(this, currencyAmount.raw).quotient, chainId);
  };

  _proto.toSignificant = function toSignificant(significantDigits, format, rounding) {
    if (significantDigits === void 0) {
      significantDigits = 6;
    }

    return this.adjusted.toSignificant(significantDigits, format, rounding);
  };

  _proto.toFixed = function toFixed(decimalPlaces, format, rounding) {
    if (decimalPlaces === void 0) {
      decimalPlaces = 4;
    }

    return this.adjusted.toFixed(decimalPlaces, format, rounding);
  };

  _createClass(Price, [{
    key: "raw",
    get: function get() {
      return new Fraction(this.numerator, this.denominator);
    }
  }, {
    key: "adjusted",
    get: function get() {
      return _Fraction.prototype.multiply.call(this, this.scalar);
    }
  }]);

  return Price;
}(Fraction);

var Route = /*#__PURE__*/function () {
  function Route(pools, input, output, hops) {
    if (hops === void 0) {
      hops = [];
    }

    !(pools.length > 0) ? process.env.NODE_ENV !== "production" ? invariant(false, 'PAIRS') : invariant(false) : void 0;
    !(pools.every(function (pool) {
      return pool.tokenCount === 2;
    }) || hops.length === pools.length - 1) ? process.env.NODE_ENV !== "production" ? invariant(false, 'HOPS') : invariant(false) : void 0;
    var chainId = pools[0].chainId;
    !pools.every(function (pool) {
      return pool.chainId === chainId;
    }) ? process.env.NODE_ENV !== "production" ? invariant(false, 'CHAIN_IDS') : invariant(false) : void 0;

    if (input === CAVAX[chainId]) {
      !pools[0].involvesToken(WAVAX[chainId]) ? process.env.NODE_ENV !== "production" ? invariant(false, 'INPUT') : invariant(false) : void 0;
    }

    if (output === CAVAX[chainId]) {
      !pools[pools.length - 1].involvesToken(WAVAX[chainId]) ? process.env.NODE_ENV !== "production" ? invariant(false, 'OUTPUT') : invariant(false) : void 0;
    }

    var wrappedInput = input instanceof Token ? input : WAVAX[chainId];
    var wrappedOutput = output instanceof Token ? output : WAVAX[chainId];
    var path = [wrappedInput];

    for (var _iterator = _createForOfIteratorHelperLoose(pools.entries()), _step; !(_step = _iterator()).done;) {
      var _step$value = _step.value,
          i = _step$value[0],
          pool = _step$value[1];
      var inputToken = path[i];
      !pool.involvesToken(inputToken) ? process.env.NODE_ENV !== "production" ? invariant(false, 'PATH') : invariant(false) : void 0;
      var outputToken = void 0;

      if (pool.tokenCount === 2) {
        outputToken = inputToken.equals(pool.token(0)) ? pool.token(1) : pool.token(0);
      } else {
        // When a pool has 3+ tokens we need `hops` to guarantee a deterministic path
        outputToken = i === pools.length ? wrappedOutput : hops[i];
        !!inputToken.equals(outputToken) ? process.env.NODE_ENV !== "production" ? invariant(false, 'DUPLICATE') : invariant(false) : void 0;
        !pool.involvesToken(outputToken) ? process.env.NODE_ENV !== "production" ? invariant(false, 'PATH') : invariant(false) : void 0;
      }

      path.push(outputToken);
    }

    this.pools = pools;
    this.path = path;
    this.midPrice = Price.fromRoute(this);
    this.input = input;
    this.output = output;
  }

  _createClass(Route, [{
    key: "chainId",
    get: function get() {
      return this.pools[0].chainId;
    }
  }]);

  return Route;
}();

var _100_PERCENT = /*#__PURE__*/new Fraction(_100);

var Percent = /*#__PURE__*/function (_Fraction) {
  _inheritsLoose(Percent, _Fraction);

  function Percent() {
    return _Fraction.apply(this, arguments) || this;
  }

  var _proto = Percent.prototype;

  _proto.toSignificant = function toSignificant(significantDigits, format, rounding) {
    if (significantDigits === void 0) {
      significantDigits = 5;
    }

    return this.multiply(_100_PERCENT).toSignificant(significantDigits, format, rounding);
  };

  _proto.toFixed = function toFixed(decimalPlaces, format, rounding) {
    if (decimalPlaces === void 0) {
      decimalPlaces = 2;
    }

    return this.multiply(_100_PERCENT).toFixed(decimalPlaces, format, rounding);
  };

  return Percent;
}(Fraction);

var ZERO_PERCENT = /*#__PURE__*/new Percent(ZERO);
/**
 * Returns the percent difference between the mid price and the execution price, i.e. price impact.
 * @param midPrice mid price before the trade
 * @param inputAmount the input amount of the trade
 * @param outputAmount the output amount of the trade
 */

function computePriceImpact(midPrice, inputAmount, outputAmount) {
  var exactQuote = midPrice.raw.multiply(inputAmount.raw); // calculate slippage := (exactQuote - outputAmount) / exactQuote

  var slippage = exactQuote.subtract(outputAmount.raw).divide(exactQuote);
  return new Percent(slippage.numerator, slippage.denominator);
} // comparator function that allows sorting trades by their output amounts, in decreasing order, and then input amounts
// in increasing order. i.e. the best trades have the most outputs for the least inputs and are sorted first


function inputOutputComparator(a, b) {
  // must have same input and output token for comparison
  !currencyEquals(a.inputAmount.currency, b.inputAmount.currency) ? process.env.NODE_ENV !== "production" ? invariant(false, 'INPUT_CURRENCY') : invariant(false) : void 0;
  !currencyEquals(a.outputAmount.currency, b.outputAmount.currency) ? process.env.NODE_ENV !== "production" ? invariant(false, 'OUTPUT_CURRENCY') : invariant(false) : void 0;

  if (a.outputAmount.equalTo(b.outputAmount)) {
    if (a.inputAmount.equalTo(b.inputAmount)) {
      return 0;
    } // trade A requires less input than trade B, so A should come first


    if (a.inputAmount.lessThan(b.inputAmount)) {
      return -1;
    } else {
      return 1;
    }
  } else {
    // tradeA has less output than trade B, so should come second
    if (a.outputAmount.lessThan(b.outputAmount)) {
      return 1;
    } else {
      return -1;
    }
  }
} // extension of the input output comparator that also considers other dimensions of the trade in ranking them

function tradeComparator(a, b) {
  var ioComp = inputOutputComparator(a, b);

  if (ioComp !== 0) {
    return ioComp;
  } // consider lowest slippage next, since these are less likely to fail


  if (a.priceImpact.lessThan(b.priceImpact)) {
    return -1;
  } else if (a.priceImpact.greaterThan(b.priceImpact)) {
    return 1;
  } // finally consider the number of hops since each hop costs gas


  return a.route.path.length - b.route.path.length;
}
/**
 * Given a currency amount and a chain ID, returns the equivalent representation as the token amount.
 * In other words, if the currency is ETHER, returns the WETH token amount for the given chain. Otherwise, returns
 * the input currency amount.
 */

function wrappedAmount(currencyAmount, chainId) {
  if (chainId === void 0) {
    chainId = ChainId.AVALANCHE;
  }

  if (currencyAmount instanceof TokenAmount) return currencyAmount;
  if (currencyAmount.currency === CAVAX[chainId]) return new TokenAmount(WAVAX[chainId], currencyAmount.raw);
   process.env.NODE_ENV !== "production" ? invariant(false, 'CURRENCY') : invariant(false) ;
}

function wrappedCurrency(currency, chainId) {
  if (chainId === void 0) {
    chainId = ChainId.AVALANCHE;
  }

  if (currency instanceof Token) return currency;
  if (currency === CAVAX[chainId]) return WAVAX[chainId];
   process.env.NODE_ENV !== "production" ? invariant(false, 'CURRENCY') : invariant(false) ;
}
/**
 * Represents a trade executed against a list of pools.
 * Does not account for slippage, i.e. trades that front run this trade and move the price.
 */


var Trade = /*#__PURE__*/function () {
  function Trade(route, amount, tradeType, chainId, _temp) {
    if (chainId === void 0) {
      chainId = ChainId.AVALANCHE;
    }

    var _ref = _temp === void 0 ? {
      fee: ZERO_PERCENT,
      feeTo: ZERO_ADDRESS
    } : _temp,
        fee = _ref.fee,
        feeTo = _ref.feeTo;

    this.chainId = ChainId.AVALANCHE;
    this.fee = new Percent(ZERO);
    this.feeTo = ZERO_ADDRESS;
    var amounts = new Array(route.path.length);
    var nextPools = new Array(route.pools.length);
    var fullOutputAmount;

    if (tradeType === TradeType.EXACT_INPUT) {
      !currencyEquals(amount.currency, route.input) ? process.env.NODE_ENV !== "production" ? invariant(false, 'INPUT') : invariant(false) : void 0;
      amounts[0] = wrappedAmount(amount, route.chainId);

      for (var i = 0; i < route.path.length - 1; i++) {
        var pool = route.pools[i];

        var _pool$getOutputAmount = pool.getOutputAmount(amounts[i], route.path[i + 1]),
            outputAmount = _pool$getOutputAmount[0],
            nextPool = _pool$getOutputAmount[1];

        amounts[i + 1] = outputAmount;
        nextPools[i] = nextPool;
      }

      fullOutputAmount = amounts[amounts.length - 1];
      var userReceivedAmountOut = new Fraction(ONE).subtract(fee).multiply(fullOutputAmount.raw).quotient;
      amounts[amounts.length - 1] = new TokenAmount(fullOutputAmount.token, userReceivedAmountOut);
    } else {
      !currencyEquals(amount.currency, route.output) ? process.env.NODE_ENV !== "production" ? invariant(false, 'OUTPUT') : invariant(false) : void 0;

      var _userReceivedAmountOut = wrappedAmount(amount, route.chainId);

      var fullOutputQuantity = new Fraction(ONE).add(fee).multiply(_userReceivedAmountOut.raw).quotient;
      fullOutputAmount = new TokenAmount(_userReceivedAmountOut.token, fullOutputQuantity);
      amounts[amounts.length - 1] = fullOutputAmount;

      for (var _i = route.path.length - 1; _i > 0; _i--) {
        var _pool = route.pools[_i - 1];

        var _pool$getInputAmount = _pool.getInputAmount(amounts[_i], route.path[_i - 1]),
            inputAmount = _pool$getInputAmount[0],
            _nextPool = _pool$getInputAmount[1];

        amounts[_i - 1] = inputAmount;
        nextPools[_i - 1] = _nextPool;
      }

      amounts[amounts.length - 1] = _userReceivedAmountOut;
    }

    this.route = route;
    this.tradeType = tradeType;
    this.inputAmount = tradeType === TradeType.EXACT_INPUT ? amount : route.input === CAVAX[chainId] ? CurrencyAmount.ether(amounts[0].raw, chainId) : amounts[0];
    this.outputAmount = tradeType === TradeType.EXACT_OUTPUT ? amount : route.output === CAVAX[chainId] ? CurrencyAmount.ether(amounts[amounts.length - 1].raw, chainId) : amounts[amounts.length - 1];
    this.executionPrice = new Price(this.inputAmount.currency, this.outputAmount.currency, this.inputAmount.raw, this.outputAmount.raw);
    this.nextMidPrice = Price.fromRoute(new Route(nextPools, route.input, route.output));
    this.priceImpact = computePriceImpact(route.midPrice, this.inputAmount, fullOutputAmount);
    this.chainId = chainId;
    this.fee = fee;
    this.feeTo = feeTo;
  }
  /**
   * Constructs an exact in trade with the given amount in and route
   * @param route route of the exact in trade
   * @param amountIn the amount being passed in
   * @param chainId chain id
   * @param daasOptions fee information possibly imposed via DEX as a service
   */


  Trade.exactIn = function exactIn(route, amountIn, chainId, daasOptions) {
    if (chainId === void 0) {
      chainId = ChainId.AVALANCHE;
    }

    return new Trade(route, amountIn, TradeType.EXACT_INPUT, chainId, daasOptions);
  }
  /**
   * Constructs an exact out trade with the given amount out and route
   * @param route route of the exact out trade
   * @param amountOut the amount returned by the trade
   * @param chainId chain id
   * @param daasOptions fee information possibly imposed via DEX as a service
   */
  ;

  Trade.exactOut = function exactOut(route, amountOut, chainId, daasOptions) {
    if (chainId === void 0) {
      chainId = ChainId.AVALANCHE;
    }

    return new Trade(route, amountOut, TradeType.EXACT_OUTPUT, chainId, daasOptions);
  }
  /**
   * Get the minimum amount that must be received from this trade for the given slippage tolerance
   * @param slippageTolerance tolerance of unfavorable slippage from the execution price of this trade
   */
  ;

  var _proto = Trade.prototype;

  _proto.minimumAmountOut = function minimumAmountOut(slippageTolerance) {
    !!slippageTolerance.lessThan(ZERO) ? process.env.NODE_ENV !== "production" ? invariant(false, 'SLIPPAGE_TOLERANCE') : invariant(false) : void 0;

    if (this.tradeType === TradeType.EXACT_OUTPUT) {
      return this.outputAmount;
    } else {
      var slippageAdjustedAmountOut = new Fraction(ONE).add(slippageTolerance).invert().multiply(this.outputAmount.raw).quotient;
      return this.outputAmount instanceof TokenAmount ? new TokenAmount(this.outputAmount.token, slippageAdjustedAmountOut) : CurrencyAmount.ether(slippageAdjustedAmountOut, this.chainId);
    }
  }
  /**
   * Get the maximum amount in that can be spent via this trade for the given slippage tolerance
   * @param slippageTolerance tolerance of unfavorable slippage from the execution price of this trade
   */
  ;

  _proto.maximumAmountIn = function maximumAmountIn(slippageTolerance) {
    !!slippageTolerance.lessThan(ZERO) ? process.env.NODE_ENV !== "production" ? invariant(false, 'SLIPPAGE_TOLERANCE') : invariant(false) : void 0;

    if (this.tradeType === TradeType.EXACT_INPUT) {
      return this.inputAmount;
    } else {
      var slippageAdjustedAmountIn = new Fraction(ONE).add(slippageTolerance).multiply(this.inputAmount.raw).quotient;
      return this.inputAmount instanceof TokenAmount ? new TokenAmount(this.inputAmount.token, slippageAdjustedAmountIn) : CurrencyAmount.ether(slippageAdjustedAmountIn, this.chainId);
    }
  }
  /**
   * Given a list of pools, and a fixed amount in, returns the top `maxNumResults` trades that go from an input token
   * amount to an output token, making at most `maxHops` hops.
   * Note this does not consider aggregation, as routes are linear. It's possible a better route exists by splitting
   * the amount in among multiple routes.
   * @param pools the pools to consider in finding the best trade
   * @param currencyAmountIn exact amount of input currency to spend
   * @param currencyOut the desired currency out
   * @param maxNumResults maximum number of results to return
   * @param maxHops maximum number of hops a returned trade can make, e.g. 1 hop goes through a single pool
   * @param fee total fee possibly imposed via DEX as a service
   * @param feeTo possible DEX as a service partner
   * @param currentPools used in recursion; the current list of pools
   * @param currentHops used in recursion; the current list of intermediate hops for pools with 3+ assets
   * @param originalAmountIn used in recursion; the original value of the currencyAmountIn parameter
   * @param bestTrades used in recursion; the current list of best trades
   */
  ;

  Trade.bestTradeExactIn = function bestTradeExactIn(pools, currencyAmountIn, currencyOut, _temp2, _temp3, // used in recursion.
  currentPools, currentHops, originalAmountIn, bestTrades) {
    var _ref2 = _temp2 === void 0 ? {} : _temp2,
        _ref2$maxNumResults = _ref2.maxNumResults,
        maxNumResults = _ref2$maxNumResults === void 0 ? 3 : _ref2$maxNumResults,
        _ref2$maxHops = _ref2.maxHops,
        maxHops = _ref2$maxHops === void 0 ? 3 : _ref2$maxHops;

    var _ref3 = _temp3 === void 0 ? {
      fee: ZERO_PERCENT,
      feeTo: ZERO_ADDRESS
    } : _temp3,
        fee = _ref3.fee,
        feeTo = _ref3.feeTo;

    if (currentPools === void 0) {
      currentPools = [];
    }

    if (currentHops === void 0) {
      currentHops = [];
    }

    if (originalAmountIn === void 0) {
      originalAmountIn = currencyAmountIn;
    }

    if (bestTrades === void 0) {
      bestTrades = [];
    }

    !(pools.length > 0) ? process.env.NODE_ENV !== "production" ? invariant(false, 'POOLS') : invariant(false) : void 0;
    !(maxHops > 0) ? process.env.NODE_ENV !== "production" ? invariant(false, 'MAX_HOPS') : invariant(false) : void 0;
    !(originalAmountIn === currencyAmountIn || currentPools.length > 0) ? process.env.NODE_ENV !== "production" ? invariant(false, 'INVALID_RECURSION') : invariant(false) : void 0;
    var chainId = currencyAmountIn instanceof TokenAmount ? currencyAmountIn.token.chainId : currencyOut instanceof Token ? currencyOut.chainId : undefined;
    !(chainId !== undefined) ? process.env.NODE_ENV !== "production" ? invariant(false, 'CHAIN_ID') : invariant(false) : void 0;
    var amountIn = wrappedAmount(currencyAmountIn, chainId);
    var tokenIn = amountIn.token;
    var tokenOut = wrappedCurrency(currencyOut, chainId);

    for (var i = 0; i < pools.length; i++) {
      var pool = pools[i];

      if (pool.reserves.some(function (reserve) {
        return reserve.equalTo(ZERO);
      })) {
        // Remove this pool from future routing consideration
        pools = pools.slice(0, i).concat(pools.slice(i + 1, pools.length));
        i--;
        continue;
      }

      if (!pool.involvesToken(tokenIn)) continue; // Avoid repeatedly calling tokenAmounts.map (nested in pool.tokens) during the subsequent for loop

      var poolTokens = pool.tokens;

      for (var _iterator = _createForOfIteratorHelperLoose(poolTokens), _step; !(_step = _iterator()).done;) {
        var tokenHop = _step.value;
        if (tokenHop.equals(tokenIn)) continue;
        var amountOut = void 0;

        try {
          ;

          var _pool$getOutputAmount2 = pool.getOutputAmount(amountIn, tokenHop);

          amountOut = _pool$getOutputAmount2[0];
        } catch (error) {
          if (error instanceof InsufficientInputAmountError || error instanceof InsufficientReservesError) {
            continue;
          }

          throw error;
        } // we have arrived at the output token, so this is the final trade of one of the paths


        if (amountOut.token.equals(tokenOut)) {
          sortedInsert(bestTrades, new Trade(new Route([].concat(currentPools, [pool]), originalAmountIn.currency, currencyOut, currentHops), originalAmountIn, TradeType.EXACT_INPUT, chainId, {
            fee: fee,
            feeTo: feeTo
          }), maxNumResults, tradeComparator);
        } else if (maxHops > 1 && pools.length > 1) {
          var poolsExcludingThisPool = pools.slice(0, i).concat(pools.slice(i + 1, pools.length)); // otherwise, consider all the other paths that lead from this token as long as we have not exceeded maxHops

          Trade.bestTradeExactIn(poolsExcludingThisPool, amountOut, currencyOut, {
            maxNumResults: maxNumResults,
            maxHops: maxHops - 1
          }, {
            fee: fee,
            feeTo: feeTo
          }, [].concat(currentPools, [pool]), [].concat(currentHops, [tokenHop]), originalAmountIn, bestTrades);
        }
      }
    }

    return bestTrades;
  }
  /**
   * similar to the above method but instead targets a fixed output amount
   * given a list of pools, and a fixed amount out, returns the top `maxNumResults` trades that go from an input token
   * to an output token amount, making at most `maxHops` hops
   * note this does not consider aggregation, as routes are linear. it's possible a better route exists by splitting
   * the amount in among multiple routes.
   * @param pools the pools to consider in finding the best trade
   * @param currencyIn the currency to spend
   * @param currencyAmountOut the exact amount of currency out
   * @param maxNumResults maximum number of results to return
   * @param maxHops maximum number of hops a returned trade can make, e.g. 1 hop goes through a single pool
   * @param fee total fee possibly imposed via DEX as a service
   * @param feeTo possible DEX as a service partner
   * @param currentPools used in recursion; the current list of pools
   * @param currentHops used in recursion; the current list of intermediate hops for pools with 3+ assets
   * @param originalAmountOut used in recursion; the original value of the currencyAmountOut parameter
   * @param bestTrades used in recursion; the current list of best trades
   */
  ;

  Trade.bestTradeExactOut = function bestTradeExactOut(pools, currencyIn, currencyAmountOut, _temp4, _temp5, // used in recursion.
  currentPools, currentHops, originalAmountOut, bestTrades) {
    var _ref4 = _temp4 === void 0 ? {} : _temp4,
        _ref4$maxNumResults = _ref4.maxNumResults,
        maxNumResults = _ref4$maxNumResults === void 0 ? 3 : _ref4$maxNumResults,
        _ref4$maxHops = _ref4.maxHops,
        maxHops = _ref4$maxHops === void 0 ? 3 : _ref4$maxHops;

    var _ref5 = _temp5 === void 0 ? {
      fee: ZERO_PERCENT,
      feeTo: ZERO_ADDRESS
    } : _temp5,
        fee = _ref5.fee,
        feeTo = _ref5.feeTo;

    if (currentPools === void 0) {
      currentPools = [];
    }

    if (currentHops === void 0) {
      currentHops = [];
    }

    if (originalAmountOut === void 0) {
      originalAmountOut = currencyAmountOut;
    }

    if (bestTrades === void 0) {
      bestTrades = [];
    }

    !(pools.length > 0) ? process.env.NODE_ENV !== "production" ? invariant(false, 'POOLS') : invariant(false) : void 0;
    !(maxHops > 0) ? process.env.NODE_ENV !== "production" ? invariant(false, 'MAX_HOPS') : invariant(false) : void 0;
    !(originalAmountOut === currencyAmountOut || currentPools.length > 0) ? process.env.NODE_ENV !== "production" ? invariant(false, 'INVALID_RECURSION') : invariant(false) : void 0;
    var chainId = currencyAmountOut instanceof TokenAmount ? currencyAmountOut.token.chainId : currencyIn instanceof Token ? currencyIn.chainId : undefined;
    !(chainId !== undefined) ? process.env.NODE_ENV !== "production" ? invariant(false, 'CHAIN_ID') : invariant(false) : void 0;
    var amountOut = wrappedAmount(currencyAmountOut, chainId);
    var tokenIn = wrappedCurrency(currencyIn, chainId);
    var tokenOut = amountOut.token;

    for (var i = 0; i < pools.length; i++) {
      var pool = pools[i];

      if (pool.reserves.some(function (reserve) {
        return reserve.equalTo(ZERO);
      })) {
        // Remove this pool from future routing consideration
        pools = pools.slice(0, i).concat(pools.slice(i + 1, pools.length));
        i--;
        continue;
      }

      if (!pool.involvesToken(tokenOut)) continue; // Avoid repeatedly calling tokenAmounts.map (nested in pool.tokens) during the subsequent for loop

      var poolTokens = pool.tokens;

      for (var _iterator2 = _createForOfIteratorHelperLoose(poolTokens), _step2; !(_step2 = _iterator2()).done;) {
        var tokenHop = _step2.value;
        if (tokenHop.equals(tokenOut)) continue;
        var amountIn = void 0;

        try {
          ;

          var _pool$getInputAmount2 = pool.getInputAmount(amountOut, tokenHop);

          amountIn = _pool$getInputAmount2[0];
        } catch (error) {
          if (error instanceof InsufficientInputAmountError || error instanceof InsufficientReservesError) {
            continue;
          }

          throw error;
        } // we have arrived at the input token, so this is the first trade of one of the paths


        if (amountIn.token.equals(tokenIn)) {
          sortedInsert(bestTrades, new Trade(new Route([pool].concat(currentPools), currencyIn, originalAmountOut.currency, currentHops), originalAmountOut, TradeType.EXACT_OUTPUT, chainId, {
            fee: fee,
            feeTo: feeTo
          }), maxNumResults, tradeComparator);
        } else if (maxHops > 1 && pools.length > 1) {
          var poolsExcludingThisPool = pools.slice(0, i).concat(pools.slice(i + 1, pools.length)); // otherwise, consider all the other paths that arrive at this token as long as we have not exceeded maxHops

          Trade.bestTradeExactOut(poolsExcludingThisPool, currencyIn, amountIn, {
            maxNumResults: maxNumResults,
            maxHops: maxHops - 1
          }, {
            fee: fee,
            feeTo: feeTo
          }, [pool].concat(currentPools), [tokenHop].concat(currentHops), originalAmountOut, bestTrades);
        }
      }
    }

    return bestTrades;
  };

  return Trade;
}();

var Pool = /*#__PURE__*/function () {
  function Pool(chainId, liquidityToken, tokenAmounts) {
    var addresses = tokenAmounts.map(function (tokenAmount) {
      return tokenAmount.token.address.toLowerCase();
    });
    !addresses.every(function (address, i) {
      return addresses.indexOf(address) === i;
    }) ? process.env.NODE_ENV !== "production" ? invariant(false, 'DUPLICATE_TOKEN') : invariant(false) : void 0;
    !(tokenAmounts.length > 0) ? process.env.NODE_ENV !== "production" ? invariant(false, 'INSUFFICIENT_TOKENS') : invariant(false) : void 0;
    !tokenAmounts.every(function (_ref) {
      var token = _ref.token;
      return token.chainId === chainId;
    }) ? process.env.NODE_ENV !== "production" ? invariant(false, 'CHAIN_MISMATCH') : invariant(false) : void 0;
    this.chainId = chainId;
    this.liquidityToken = liquidityToken;
    this.tokenAmounts = tokenAmounts;
  } // Tokens


  var _proto = Pool.prototype;

  _proto.involvesToken = function involvesToken(token) {
    return this.tokenAmounts.some(function (tokenAmount) {
      return tokenAmount.token.equals(token);
    });
  };

  _proto.token = function token(index) {
    return this.tokenAmounts[index].token;
  };

  _proto.tokenIndex = function tokenIndex(token) {
    return this.tokenAmounts.findIndex(function (tokenAmount) {
      return tokenAmount.token.equals(token);
    });
  } // Reserves
  ;

  _proto.reserveOfIndex = function reserveOfIndex(index) {
    return this.tokenAmounts[index];
  };

  _proto.reserveOfToken = function reserveOfToken(token) {
    var index = this.tokenIndex(token);
    !(index >= 0) ? process.env.NODE_ENV !== "production" ? invariant(false, 'TOKEN_MISSING') : invariant(false) : void 0;
    return this.tokenAmounts[index];
  } // Prices
  ;

  _proto.priceOf = function priceOf(baseToken, quoteToken) {
    return new Price(baseToken, quoteToken, this.reserveOfToken(baseToken).raw, this.reserveOfToken(quoteToken).raw);
  };

  _createClass(Pool, [{
    key: "tokenCount",
    get: function get() {
      return this.tokenAmounts.length;
    }
  }, {
    key: "tokens",
    get: function get() {
      return this.tokenAmounts.map(function (tokenAmount) {
        return tokenAmount.token;
      });
    }
  }, {
    key: "reserves",
    get: function get() {
      return this.tokenAmounts;
    }
  }]);

  return Pool;
}();

var Pair = /*#__PURE__*/function (_Pool) {
  _inheritsLoose(Pair, _Pool);

  Pair.getAddress = function getAddress(tokenA, tokenB, chainId) {
    var _CHAINS$chainId;

    if (chainId === void 0) {
      chainId = ChainId.AVALANCHE;
    }

    var tokens = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA]; // does safety checks
    // we create custom lp address here
    // for evm we have method to create lp address
    // but for non-evm we don't have that method, so for now we are going to concatenate both token addresses

    return !!((_CHAINS$chainId = CHAINS[chainId]) !== null && _CHAINS$chainId !== void 0 && _CHAINS$chainId.evm) ? getCreate2Address(FACTORY_ADDRESS[chainId], keccak256(['bytes'], [pack(['address', 'address'], [tokens[0].address, tokens[1].address])]), INIT_CODE_HASH) : tokens[0].address + "-" + tokens[1].address;
  };

  function Pair(tokenAmountA, tokenAmountB, chainId) {
    if (chainId === void 0) {
      chainId = ChainId.AVALANCHE;
    }

    var tokenAmounts = tokenAmountA.token.sortsBefore(tokenAmountB.token) // does safety checks
    ? [tokenAmountA, tokenAmountB] : [tokenAmountB, tokenAmountA];
    var decimals;

    if ([ChainId.NEAR_TESTNET, ChainId.NEAR_MAINNET].includes(chainId)) {
      decimals = 24;
    } else {
      decimals = 18;
    }

    var liquidityToken = new Token(chainId, Pair.getAddress(tokenAmounts[0].token, tokenAmounts[1].token, chainId), decimals, 'PGL', 'Pangolin Liquidity');
    return _Pool.call(this, chainId, liquidityToken, tokenAmounts) || this;
  }

  var _proto = Pair.prototype;

  _proto.getOutputAmount = function getOutputAmount(inputAmount, outputToken) {
    !(this.involvesToken(inputAmount.token) && this.involvesToken(outputToken)) ? process.env.NODE_ENV !== "production" ? invariant(false, 'TOKEN') : invariant(false) : void 0;

    if (JSBI.equal(this.reserve0.raw, ZERO) || JSBI.equal(this.reserve1.raw, ZERO)) {
      throw new InsufficientReservesError();
    }

    var inputReserve = this.reserveOfToken(inputAmount.token);
    var outputReserve = this.reserveOfToken(inputAmount.token.equals(this.token0) ? this.token1 : this.token0);
    var inputAmountWithFee = JSBI.multiply(inputAmount.raw, this.swapFeeCoefficient);
    var numerator = JSBI.multiply(inputAmountWithFee, outputReserve.raw);
    var denominator = JSBI.add(JSBI.multiply(inputReserve.raw, this.swapFeeDivisor), inputAmountWithFee);
    var outputAmount = new TokenAmount(inputAmount.token.equals(this.token0) ? this.token1 : this.token0, JSBI.divide(numerator, denominator));

    if (JSBI.equal(outputAmount.raw, ZERO)) {
      throw new InsufficientInputAmountError();
    }

    return [outputAmount, new Pair(inputReserve.add(inputAmount), outputReserve.subtract(outputAmount), this.chainId)];
  };

  _proto.getInputAmount = function getInputAmount(outputAmount, inputToken) {
    !(this.involvesToken(outputAmount.token) && this.involvesToken(inputToken)) ? process.env.NODE_ENV !== "production" ? invariant(false, 'TOKEN') : invariant(false) : void 0;

    if (JSBI.equal(this.reserve0.raw, ZERO) || JSBI.equal(this.reserve1.raw, ZERO) || JSBI.greaterThanOrEqual(outputAmount.raw, this.reserveOfToken(outputAmount.token).raw)) {
      throw new InsufficientReservesError();
    }

    var outputReserve = this.reserveOfToken(outputAmount.token);
    var inputReserve = this.reserveOfToken(outputAmount.token.equals(this.token0) ? this.token1 : this.token0);
    var numerator = JSBI.multiply(JSBI.multiply(inputReserve.raw, outputAmount.raw), this.swapFeeDivisor);
    var denominator = JSBI.multiply(JSBI.subtract(outputReserve.raw, outputAmount.raw), this.swapFeeCoefficient);
    var inputAmount = new TokenAmount(outputAmount.token.equals(this.token0) ? this.token1 : this.token0, JSBI.add(JSBI.divide(numerator, denominator), ONE));
    return [inputAmount, new Pair(inputReserve.add(inputAmount), outputReserve.subtract(outputAmount), this.chainId)];
  };

  _proto.getLiquidityMinted = function getLiquidityMinted(totalSupply, depositTokenAmounts) {
    !totalSupply.token.equals(this.liquidityToken) ? process.env.NODE_ENV !== "production" ? invariant(false, 'LIQUIDITY') : invariant(false) : void 0;
    !(depositTokenAmounts.length === 2) ? process.env.NODE_ENV !== "production" ? invariant(false, 'LIQUIDITY_TOKENS') : invariant(false) : void 0;
    var tokenAmounts = depositTokenAmounts[0].token.sortsBefore(depositTokenAmounts[1].token) // does safety checks
    ? [depositTokenAmounts[0], depositTokenAmounts[1]] : [depositTokenAmounts[1], depositTokenAmounts[0]];
    !(tokenAmounts[0].token.equals(this.token0) && tokenAmounts[1].token.equals(this.token1)) ? process.env.NODE_ENV !== "production" ? invariant(false, 'TOKEN') : invariant(false) : void 0;
    var liquidity;

    if (JSBI.equal(totalSupply.raw, ZERO)) {
      liquidity = JSBI.subtract(sqrt(JSBI.multiply(tokenAmounts[0].raw, tokenAmounts[1].raw)), MINIMUM_LIQUIDITY);
    } else {
      var amount0 = JSBI.divide(JSBI.multiply(tokenAmounts[0].raw, totalSupply.raw), this.reserve0.raw);
      var amount1 = JSBI.divide(JSBI.multiply(tokenAmounts[1].raw, totalSupply.raw), this.reserve1.raw);
      liquidity = JSBI.lessThanOrEqual(amount0, amount1) ? amount0 : amount1;
    }

    if (!JSBI.greaterThan(liquidity, ZERO)) {
      throw new InsufficientInputAmountError();
    }

    return new TokenAmount(this.liquidityToken, liquidity);
  };

  _proto.getLiquidityValues = function getLiquidityValues(totalSupply, liquidity, options) {
    !totalSupply.token.equals(this.liquidityToken) ? process.env.NODE_ENV !== "production" ? invariant(false, 'TOTAL_SUPPLY') : invariant(false) : void 0;
    !liquidity.token.equals(this.liquidityToken) ? process.env.NODE_ENV !== "production" ? invariant(false, 'LIQUIDITY') : invariant(false) : void 0;
    !JSBI.lessThanOrEqual(liquidity.raw, totalSupply.raw) ? process.env.NODE_ENV !== "production" ? invariant(false, 'LIQUIDITY') : invariant(false) : void 0;
    var totalSupplyAdjusted;

    if (!(options !== null && options !== void 0 && options.feeOn)) {
      totalSupplyAdjusted = totalSupply;
    } else {
      !!!(options !== null && options !== void 0 && options.kLast) ? process.env.NODE_ENV !== "production" ? invariant(false, 'K_LAST') : invariant(false) : void 0;
      var kLastParsed = parseBigintIsh(options.kLast);

      if (!JSBI.equal(kLastParsed, ZERO)) {
        var rootK = sqrt(JSBI.multiply(this.reserve0.raw, this.reserve1.raw));
        var rootKLast = sqrt(kLastParsed);

        if (JSBI.greaterThan(rootK, rootKLast)) {
          var numerator = JSBI.multiply(totalSupply.raw, JSBI.subtract(rootK, rootKLast));
          var denominator = JSBI.add(JSBI.multiply(rootK, FIVE), rootKLast);
          var feeLiquidity = JSBI.divide(numerator, denominator);
          totalSupplyAdjusted = totalSupply.add(new TokenAmount(this.liquidityToken, feeLiquidity));
        } else {
          totalSupplyAdjusted = totalSupply;
        }
      } else {
        totalSupplyAdjusted = totalSupply;
      }
    }

    return this.reserves.map(function (reserve) {
      return new TokenAmount(reserve.token, JSBI.divide(JSBI.multiply(liquidity.raw, reserve.raw), totalSupplyAdjusted.raw));
    });
  };

  _createClass(Pair, [{
    key: "token0",
    get: function get() {
      return this.tokenAmounts[0].token;
    }
  }, {
    key: "token1",
    get: function get() {
      return this.tokenAmounts[1].token;
    }
  }, {
    key: "token0Price",
    get: function get() {
      return this.priceOf(this.token0, this.token1);
    }
  }, {
    key: "token1Price",
    get: function get() {
      return this.priceOf(this.token1, this.token0);
    }
  }, {
    key: "reserve0",
    get: function get() {
      return this.tokenAmounts[0];
    }
  }, {
    key: "reserve1",
    get: function get() {
      return this.tokenAmounts[1];
    }
  }, {
    key: "swapFeeCoefficient",
    get: function get() {
      switch (this.chainId) {
        case ChainId.NEAR_MAINNET:
        case ChainId.NEAR_TESTNET:
          return _998;
        // 0.2%

        default:
          return _997;
        // 0.3%
      }
    }
  }, {
    key: "swapFeeDivisor",
    get: function get() {
      switch (this.chainId) {
        default:
          return _1000;
      }
    }
  }]);

  return Pair;
}(Pool);

var TARGET_DECIMAL = /*#__PURE__*/JSBI.BigInt(18);
var MIN_RESERVE = /*#__PURE__*/JSBI.exponentiate(TEN, TARGET_DECIMAL);
var Vault = /*#__PURE__*/function (_Pool) {
  _inheritsLoose(Vault, _Pool);

  function Vault(tokenAmounts, amp, chainId) {
    var _this;

    if (chainId === void 0) {
      chainId = ChainId.NEAR_TESTNET;
    }

    !(JSBI.greaterThanOrEqual(amp, ONE) && JSBI.lessThanOrEqual(amp, JSBI.BigInt(1000000))) ? process.env.NODE_ENV !== "production" ? invariant(false, 'AMP_ILLEGAL') : invariant(false) : void 0;
    !tokenAmounts.every(function (_ref) {
      var token = _ref.token;
      return token.decimals >= 1 && token.decimals <= 24;
    }) ? process.env.NODE_ENV !== "production" ? invariant(false, 'DECIMAL_ILLEGAL') : invariant(false) : void 0;
    var liquidityToken = new Token(chainId, Vault.getAddress(tokenAmounts.map(function (tokenAmount) {
      return tokenAmount.token;
    })), 18, 'PGL', 'Pangolin Liquidity');
    _this = _Pool.call(this, chainId, liquidityToken, tokenAmounts) || this;
    _this.amp = amp;
    return _this;
  }

  Vault.getAddress = function getAddress(tokens) {
    return tokens.map(function (token) {
      return token.address;
    }).join('-');
  };

  Vault.amount_to_c_amount = function amount_to_c_amount(amount, decimals) {
    var decimalsBI = JSBI.BigInt(decimals);

    if (JSBI.lessThanOrEqual(decimalsBI, TARGET_DECIMAL)) {
      var factor = JSBI.exponentiate(TEN, JSBI.subtract(TARGET_DECIMAL, decimalsBI));
      return JSBI.multiply(amount, factor);
    } else {
      var _factor = JSBI.exponentiate(TEN, JSBI.subtract(decimalsBI, TARGET_DECIMAL));

      return JSBI.divide(amount, _factor);
    }
  };

  Vault.c_amount_to_amount = function c_amount_to_amount(c_amount, decimals) {
    var decimalsBI = JSBI.BigInt(decimals);

    if (JSBI.lessThanOrEqual(decimalsBI, TARGET_DECIMAL)) {
      var factor = JSBI.exponentiate(TEN, JSBI.subtract(TARGET_DECIMAL, decimalsBI));
      return JSBI.divide(c_amount, factor);
    } else {
      var _factor2 = JSBI.exponentiate(TEN, JSBI.subtract(decimalsBI, TARGET_DECIMAL));

      return JSBI.multiply(c_amount, _factor2);
    }
  }
  /**
   * Returns the swap fee coefficient (x / DIVISOR) for swaps utilizing the vault.
   * Where (1 - (x/DIVISOR)) of each swap belongs to the LPs
   */
  ;

  var _proto = Vault.prototype;

  _proto.getOutputAmount = function getOutputAmount(inputAmount, outputToken) {
    var in_token_i = this.tokens.indexOf(inputAmount.token);
    var out_token_i = this.tokens.indexOf(outputToken);
    !(in_token_i >= 0 && in_token_i < this.tokenCount) ? process.env.NODE_ENV !== "production" ? invariant(false, 'TOKEN_IN_I') : invariant(false) : void 0;
    !(out_token_i >= 0 && out_token_i < this.tokenCount) ? process.env.NODE_ENV !== "production" ? invariant(false, 'TOKEN_OUT_I') : invariant(false) : void 0;

    if (this.reserveOfToken(outputToken).equalTo(ZERO)) {
      throw new InsufficientReservesError();
    }

    var c_amounts = this.reserves_c;
    var y = this.calc_y(JSBI.BigInt(this.amp), JSBI.add(c_amounts[in_token_i], inputAmount.raw), c_amounts, in_token_i, out_token_i);
    var dy = JSBI.subtract(c_amounts[out_token_i], y);
    var outputAmountWithFee = Vault.c_amount_to_amount(JSBI.divide(JSBI.multiply(dy, this.swapFeeCoefficient), this.swapFeeDivisor), outputToken.decimals);

    if (JSBI.equal(outputAmountWithFee, ZERO)) {
      throw new InsufficientInputAmountError();
    }

    var newTokenAmounts = this.tokenAmounts;
    newTokenAmounts[in_token_i] = newTokenAmounts[in_token_i].add(inputAmount);
    newTokenAmounts[out_token_i] = newTokenAmounts[out_token_i].subtract(new TokenAmount(outputToken, outputAmountWithFee));
    var newOutputTokenReserve_c = Vault.amount_to_c_amount(newTokenAmounts[out_token_i].raw, outputToken.decimals);
    !JSBI.greaterThanOrEqual(newOutputTokenReserve_c, MIN_RESERVE) ? process.env.NODE_ENV !== "production" ? invariant(false, 'MIN_RESERVE') : invariant(false) : void 0;
    return [new TokenAmount(outputToken, outputAmountWithFee), new Vault(newTokenAmounts, this.amp, this.chainId)];
  };

  _proto.getInputAmount = function getInputAmount(_outputToken, _inputToken) {
    throw new MethodNotSupported();
  } // Depositing X tokens for ? liquidity shares
  ;

  _proto.getLiquidityMinted = function getLiquidityMinted(totalSupply, depositTokenAmounts) {
    !totalSupply.token.equals(this.liquidityToken) ? process.env.NODE_ENV !== "production" ? invariant(false, 'LIQUIDITY') : invariant(false) : void 0;
    !(depositTokenAmounts.length <= this.tokenCount) ? process.env.NODE_ENV !== "production" ? invariant(false, 'LIQUIDITY_TOKENS') : invariant(false) : void 0;
    var deposit_c_amounts = [];

    for (var i = 0; i < this.tokenCount; i++) {
      var deposit = depositTokenAmounts[i];

      if (deposit) {
        !this.involvesToken(deposit.token) ? process.env.NODE_ENV !== "production" ? invariant(false, 'LIQUIDITY_TOKENS') : invariant(false) : void 0;
        deposit_c_amounts[i] = Vault.amount_to_c_amount(deposit.raw, deposit.token.decimals);
      } else {
        deposit_c_amounts[i] = ZERO;
      }
    }

    if (JSBI.equal(totalSupply.raw, ZERO)) {
      var _d_ = this.calc_d(this.amp, deposit_c_amounts);

      return new TokenAmount(this.liquidityToken, _d_);
    }

    var n = this.tokenCount;
    var old_c_amounts = this.reserves_c;
    var d_0 = this.calc_d(this.amp, old_c_amounts);
    var new_c_amounts = [];

    for (var _i = 0; _i < n; _i++) {
      new_c_amounts[_i] = JSBI.add(old_c_amounts[_i], deposit_c_amounts[_i]);
    }

    var d_1 = this.calc_d(this.amp, new_c_amounts);
    if (JSBI.lessThanOrEqual(d_1, d_0)) throw new Error("D1 need less then or equal to D0.");

    for (var _i2 = 0; _i2 < n; _i2++) {
      var ideal_balance = JSBI.divide(JSBI.multiply(old_c_amounts[_i2], d_1), d_0);
      var difference = abs(JSBI.subtract(ideal_balance, new_c_amounts[_i2]));
      var fee = this.normalized_trade_fee(n, difference);
      new_c_amounts[_i2] = JSBI.subtract(new_c_amounts[_i2], fee);
    }

    var d_2 = this.calc_d(this.amp, new_c_amounts);
    if (JSBI.lessThan(d_1, d_2)) throw new Error("D2 need less then D1.");
    if (JSBI.lessThanOrEqual(d_2, d_0)) throw new Error("D1 need less then or equal to D0.");
    var mint_shares = JSBI.divide(JSBI.multiply(totalSupply.raw, JSBI.subtract(d_2, d_0)), d_0);
    return new TokenAmount(this.liquidityToken, mint_shares);
  } // Redeeming X liquidity shares for ? (all) tokens
  ;

  _proto.getLiquidityValues = function getLiquidityValues(totalSupply, shares) {
    !totalSupply.token.equals(this.liquidityToken) ? process.env.NODE_ENV !== "production" ? invariant(false, 'TOTAL_SUPPLY') : invariant(false) : void 0;
    !shares.token.equals(this.liquidityToken) ? process.env.NODE_ENV !== "production" ? invariant(false, 'LIQUIDITY') : invariant(false) : void 0;
    !JSBI.lessThanOrEqual(shares.raw, totalSupply.raw) ? process.env.NODE_ENV !== "production" ? invariant(false, 'LIQUIDITY') : invariant(false) : void 0;
    var liquidityTokenValues = [];
    var c_amounts = this.reserves_c;

    for (var i = 0; i < this.tokenCount; i++) {
      var amount = JSBI.equal(totalSupply.raw, ZERO) ? ZERO : JSBI.divide(JSBI.multiply(this.tokenAmounts[i].raw, shares.raw), totalSupply.raw);
      var amount_c = Vault.amount_to_c_amount(amount, this.tokenAmounts[i].token.decimals);
      var remaining_amount_c = JSBI.subtract(c_amounts[i], amount_c);
      !JSBI.greaterThanOrEqual(remaining_amount_c, MIN_RESERVE) ? process.env.NODE_ENV !== "production" ? invariant(false, 'MIN_RESERVE') : invariant(false) : void 0;
      liquidityTokenValues[i] = new TokenAmount(this.tokenAmounts[i].token, amount);
    }

    return liquidityTokenValues;
  } // Withdrawing X tokens in exchange for ? liquidity shares
  ;

  _proto.getLiquidityValuesByTokens = function getLiquidityValuesByTokens(totalSupply, withdrawTokenAmounts) {
    !totalSupply.token.equals(this.liquidityToken) ? process.env.NODE_ENV !== "production" ? invariant(false, 'LIQUIDITY') : invariant(false) : void 0;
    !(withdrawTokenAmounts.length <= this.tokenCount) ? process.env.NODE_ENV !== "production" ? invariant(false, 'LIQUIDITY_TOKENS') : invariant(false) : void 0;
    var removed_c_amounts = [];

    for (var i = 0; i < this.tokenCount; i++) {
      var withdrawal = withdrawTokenAmounts[i];

      if (withdrawal) {
        !this.involvesToken(withdrawal.token) ? process.env.NODE_ENV !== "production" ? invariant(false, 'LIQUIDITY_TOKENS') : invariant(false) : void 0;
        removed_c_amounts[i] = Vault.amount_to_c_amount(withdrawal.raw, withdrawal.token.decimals);
      } else {
        removed_c_amounts[i] = ZERO;
      }
    }

    var old_c_amounts = this.reserves_c;
    var pool_token_supply = totalSupply;
    var token_num = old_c_amounts.length;
    var d_0 = this.calc_d(this.amp, old_c_amounts);
    var c_amounts = [];

    for (var _i3 = 0; _i3 < old_c_amounts.length; _i3++) {
      c_amounts[_i3] = JSBI.subtract(old_c_amounts[_i3], removed_c_amounts[_i3]);
      !JSBI.greaterThanOrEqual(c_amounts[_i3], MIN_RESERVE) ? process.env.NODE_ENV !== "production" ? invariant(false, 'MIN_RESERVE') : invariant(false) : void 0;
    }

    var d_1 = this.calc_d(this.amp, c_amounts);
    if (d_1 >= d_0) throw new Error("D1 need less then or equal to D0.");

    for (var _i4 = 0; _i4 < token_num; _i4++) {
      var ideal_balance = JSBI.divide(JSBI.multiply(old_c_amounts[_i4], d_1), d_0);
      var difference = abs(JSBI.subtract(ideal_balance, c_amounts[_i4]));
      var fee = this.normalized_trade_fee(token_num, difference);
      c_amounts[_i4] = JSBI.subtract(c_amounts[_i4], fee);
    }

    var d_2 = this.calc_d(this.amp, c_amounts);
    if (d_2 > d_1) throw new Error("D2 need less then D1.");
    if (d_1 >= d_0) throw new Error("D1 need less then or equal to D0.");
    var burn_shares = JSBI.divide(JSBI.multiply(pool_token_supply.raw, JSBI.subtract(d_0, d_2)), d_0);
    return new TokenAmount(this.liquidityToken, burn_shares);
  };

  _proto.calc_y = function calc_y(amp, x_c_amount, c_amounts, in_token_i, out_token_i) {
    var n = c_amounts.length;
    var n_jsbi = JSBI.BigInt(n);
    var nn = JSBI.exponentiate(n_jsbi, n_jsbi);
    var ann = JSBI.multiply(amp, nn);
    var d = this.calc_d(amp, c_amounts);
    var s = x_c_amount;
    var c = JSBI.divide(JSBI.multiply(d, d), x_c_amount);

    for (var i = 0; i < n; i++) {
      if (i !== in_token_i && i !== out_token_i) {
        s = JSBI.add(s, c_amounts[i]);
        c = JSBI.divide(JSBI.multiply(c, d), c_amounts[i]);
      }
    }

    c = JSBI.divide(JSBI.multiply(c, d), JSBI.multiply(ann, nn));
    var b = JSBI.add(JSBI.divide(d, ann), s);
    var y_prev = ZERO;
    var y = d;

    for (var _i5 = 0; _i5 < 256; _i5++) {
      y_prev = y;
      var y_numerator = JSBI.add(JSBI.exponentiate(y, TWO), c);
      var y_denominator = JSBI.subtract(JSBI.add(JSBI.multiply(y, TWO), b), d);
      y = JSBI.divide(y_numerator, y_denominator);
      if (JSBI.lessThanOrEqual(abs(JSBI.subtract(y, y_prev)), ONE)) break;
    }

    return y;
  };

  _proto.calc_d = function calc_d(amp, c_amounts) {
    var n = c_amounts.length;
    var n_jsbi = JSBI.BigInt(n);
    var nn = JSBI.exponentiate(n_jsbi, n_jsbi);
    var sum_amounts = ZERO;

    for (var _iterator = _createForOfIteratorHelperLoose(c_amounts), _step; !(_step = _iterator()).done;) {
      var _current_amount = _step.value;
      sum_amounts = JSBI.add(sum_amounts, _current_amount);
    }

    var d_prev = ZERO;
    var d = sum_amounts;

    for (var i = 0; i < 256; i++) {
      var d_prod = d;

      for (var _iterator2 = _createForOfIteratorHelperLoose(c_amounts), _step2; !(_step2 = _iterator2()).done;) {
        var current_amount = _step2.value;
        d_prod = JSBI.divide(JSBI.multiply(d_prod, d), JSBI.multiply(current_amount, n_jsbi));
      }

      d_prev = d;
      var ann = JSBI.multiply(amp, nn);
      var numerator = JSBI.multiply(d_prev, JSBI.add(JSBI.multiply(d_prod, n_jsbi), JSBI.multiply(ann, sum_amounts)));
      var denominator = JSBI.add(JSBI.multiply(d_prev, JSBI.subtract(ann, ONE)), JSBI.multiply(d_prod, JSBI.add(n_jsbi, ONE)));
      d = JSBI.divide(numerator, denominator);
      if (JSBI.lessThanOrEqual(abs(JSBI.subtract(d, d_prev)), ONE)) break;
    }

    return d;
  };

  _proto.normalized_trade_fee = function normalized_trade_fee(n, amount) {
    var trade_fee = JSBI.toNumber(JSBI.subtract(this.swapFeeDivisor, this.swapFeeCoefficient));
    var adjusted_trade_fee = JSBI.BigInt(Math.floor(trade_fee * n / (4 * (n - 1))));
    return JSBI.divide(JSBI.multiply(amount, adjusted_trade_fee), this.swapFeeDivisor);
  };

  _createClass(Vault, [{
    key: "reserves_c",
    get: function get() {
      return this.tokenAmounts.map(function (tokenAmount) {
        return Vault.amount_to_c_amount(tokenAmount.raw, tokenAmount.token.decimals);
      });
    }
  }, {
    key: "swapFeeCoefficient",
    get: function get() {
      switch (this.chainId) {
        default:
          return JSBI.BigInt(9995);
        // 0.05%
      }
    }
  }, {
    key: "swapFeeDivisor",
    get: function get() {
      switch (this.chainId) {
        default:
          return JSBI.BigInt(10000);
      }
    }
  }]);

  return Vault;
}(Pool);

function toHex(currencyAmount) {
  return "0x" + currencyAmount.raw.toString(16);
}

var ZERO_HEX = '0x0';
/**
 * Represents the Uniswap V2 Router, and has static methods for helping execute trades.
 */

var Router = /*#__PURE__*/function () {
  /**
   * Cannot be constructed.
   */
  function Router() {}
  /**
   * Produces the on-chain method name to call and the hex encoded parameters to pass as arguments for a given trade.
   * @param trade to produce call parameters for
   * @param options options for the call parameters
   */


  Router.swapCallParameters = function swapCallParameters(trade, options) {
    var chainId = trade.chainId;
    var etherIn = trade.inputAmount.currency === CAVAX[chainId];
    var etherOut = trade.outputAmount.currency === CAVAX[chainId]; // the router does not support both ether in and out

    !!(etherIn && etherOut) ? process.env.NODE_ENV !== "production" ? invariant(false, 'ETHER_IN_OUT') : invariant(false) : void 0;
    !(!('ttl' in options) || options.ttl > 0) ? process.env.NODE_ENV !== "production" ? invariant(false, 'TTL') : invariant(false) : void 0;
    var feeToDaaS = validateAndParseAddress(trade.feeTo);
    var isDaaS = Boolean(feeToDaaS !== ZERO_ADDRESS && !trade.fee.equalTo(ZERO));
    var to = validateAndParseAddress(options.recipient);
    var amountIn = toHex(trade.maximumAmountIn(options.allowedSlippage));
    var amountOut = toHex(trade.minimumAmountOut(options.allowedSlippage));
    var path = trade.route.path.map(function (token) {
      return token.address;
    });
    var deadline = 'ttl' in options ? "0x" + (Math.floor(new Date().getTime() / 1000) + options.ttl).toString(16) : "0x" + options.deadline.toString(16);
    var useFeeOnTransfer = Boolean(options.feeOnTransfer);
    var methodName;
    var args;
    var value;

    switch (trade.tradeType) {
      case TradeType.EXACT_INPUT:
        if (etherIn) {
          methodName = useFeeOnTransfer ? 'swapExactAVAXForTokensSupportingFeeOnTransferTokens' : 'swapExactAVAXForTokens';
          args = isDaaS ? [amountOut, path, to, deadline, feeToDaaS] : [amountOut, path, to, deadline];
          value = amountIn;
        } else if (etherOut) {
          methodName = useFeeOnTransfer ? 'swapExactTokensForAVAXSupportingFeeOnTransferTokens' : 'swapExactTokensForAVAX';
          args = isDaaS ? [amountIn, amountOut, path, to, deadline, feeToDaaS] : [amountIn, amountOut, path, to, deadline];
          value = ZERO_HEX;
        } else {
          methodName = useFeeOnTransfer ? 'swapExactTokensForTokensSupportingFeeOnTransferTokens' : 'swapExactTokensForTokens';
          args = isDaaS ? [amountIn, amountOut, path, to, deadline, feeToDaaS] : [amountIn, amountOut, path, to, deadline];
          value = ZERO_HEX;
        }

        break;

      case TradeType.EXACT_OUTPUT:
        !!useFeeOnTransfer ? process.env.NODE_ENV !== "production" ? invariant(false, 'EXACT_OUT_FOT') : invariant(false) : void 0;

        if (etherIn) {
          methodName = 'swapAVAXForExactTokens';
          args = isDaaS ? [amountOut, path, to, deadline, feeToDaaS] : [amountOut, path, to, deadline];
          value = amountIn;
        } else if (etherOut) {
          methodName = 'swapTokensForExactAVAX';
          args = isDaaS ? [amountOut, amountIn, path, to, deadline, feeToDaaS] : [amountOut, amountIn, path, to, deadline];
          value = ZERO_HEX;
        } else {
          methodName = 'swapTokensForExactTokens';
          args = isDaaS ? [amountOut, amountIn, path, to, deadline, feeToDaaS] : [amountOut, amountIn, path, to, deadline];
          value = ZERO_HEX;
        }

        break;
    }

    return {
      methodName: methodName,
      args: args,
      value: value
    };
  };

  return Router;
}();

var ERC20 = [
	{
		constant: true,
		inputs: [
		],
		name: "decimals",
		outputs: [
			{
				name: "",
				type: "uint8"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				name: "",
				type: "address"
			}
		],
		name: "balanceOf",
		outputs: [
			{
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	}
];

var TOKEN_DECIMALS_CACHE = {};
/**
 * Contains methods for constructing instances of pairs and tokens from on-chain data.
 */

var Fetcher = /*#__PURE__*/function () {
  /**
   * Cannot be constructed.
   */
  function Fetcher() {}
  /**
   * Fetch information for a given token on the given chain, using the given ethers provider.
   * @param chainId chain of the token
   * @param address address of the token on the chain
   * @param provider provider used to fetch the token
   * @param symbol optional symbol of the token
   * @param name optional name of the token
   */


  Fetcher.fetchTokenData = function fetchTokenData(chainId, address, provider, symbol, name) {
    try {
      var _TOKEN_DECIMALS_CACHE, _TOKEN_DECIMALS_CACHE2;

      var _temp3 = function _temp3(parsedDecimals) {
        return new Token(chainId, address, parsedDecimals, symbol, name);
      };

      if (chainId === undefined) chainId = ChainId.AVALANCHE;
      if (provider === undefined) provider = getDefaultProvider(getNetwork(chainId));

      var _temp4 = typeof ((_TOKEN_DECIMALS_CACHE = TOKEN_DECIMALS_CACHE) === null || _TOKEN_DECIMALS_CACHE === void 0 ? void 0 : (_TOKEN_DECIMALS_CACHE2 = _TOKEN_DECIMALS_CACHE[chainId]) === null || _TOKEN_DECIMALS_CACHE2 === void 0 ? void 0 : _TOKEN_DECIMALS_CACHE2[address]) === 'number';

      return Promise.resolve(_temp4 ? _temp3(TOKEN_DECIMALS_CACHE[chainId][address]) : Promise.resolve(new Contract(address, ERC20, provider).decimals().then(function (decimals) {
        var _TOKEN_DECIMALS_CACHE3, _extends2, _extends3;

        TOKEN_DECIMALS_CACHE = _extends({}, TOKEN_DECIMALS_CACHE, (_extends3 = {}, _extends3[chainId] = _extends({}, (_TOKEN_DECIMALS_CACHE3 = TOKEN_DECIMALS_CACHE) === null || _TOKEN_DECIMALS_CACHE3 === void 0 ? void 0 : _TOKEN_DECIMALS_CACHE3[chainId], (_extends2 = {}, _extends2[address] = decimals, _extends2)), _extends3));
        return decimals;
      })).then(_temp3));
    } catch (e) {
      return Promise.reject(e);
    }
  }
  /**
   * Fetches information about a pair and constructs a pair from the given two tokens.
   * @param tokenA first token
   * @param tokenB second token
   * @param provider the provider to use to fetch the data
   */
  ;

  Fetcher.fetchPairData = function fetchPairData(tokenA, tokenB, provider) {
    try {
      if (provider === undefined) provider = getDefaultProvider(getNetwork(tokenA.chainId));
      !(tokenA.chainId === tokenB.chainId) ? process.env.NODE_ENV !== "production" ? invariant(false, 'CHAIN_ID') : invariant(false) : void 0;
      var address = Pair.getAddress(tokenA, tokenB, tokenA.chainId);
      return Promise.resolve(new Contract(address, IPangolinPair.abi, provider).getReserves()).then(function (_ref) {
        var reserves0 = _ref[0],
            reserves1 = _ref[1];
        var balances = tokenA.sortsBefore(tokenB) ? [reserves0, reserves1] : [reserves1, reserves0];
        return new Pair(new TokenAmount(tokenA, balances[0]), new TokenAmount(tokenB, balances[1]), tokenA.chainId);
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return Fetcher;
}();

export { ALL_CHAINS, ARBITRUM_MAINNET, ARBITRUM_RINKEBY, ASTAR_MAINNET, AURORA_MAINNET, AURORA_TESTNET, AVALANCHE_FUJI, AVALANCHE_MAINNET, AirdropType, BITTORRENT_MAINNET, BITTORRENT_TESTNET, BOBA_MAINNET, BSC_MAINNET, BSC_TESTNET, CAVAX, CELO_ALFAJORES_TESTNET, CELO_BAKLAVA_TESTNET, CELO_MAINNET, CHAINS, COSTON_TESTNET, CRONOS_MAINNET, CRONOS_TESTNET, ChainId, ChefType, Currency, CurrencyAmount, ETHEREUM_MAINNET, EVMOS_MAINNET, EVMOS_TESTNET, EWC_MAINNET, EWC_TESTNET, FACTORY_ADDRESS, FANTOM_MAINNET, FANTOM_TESTNET, FLARE_MAINNET, FUSE_MAINNET, FUSE_TESTNET, Fetcher, Fraction, GODWOKEN_MAINNET, GODWOKEN_TESTNET, HARMONY_MAINNET, HARMONY_TESTNET, HECO_MAINNET, HECO_TESTNET, INIT_CODE_HASH, IOTEX_MAINNET, IOTEX_TESTNET, InsufficientInputAmountError, InsufficientReservesError, KLAYTN_BAOBAB, KLAYTN_MAINNET, METIS_MAINNET, METIS_RINKEBY, MINIMUM_LIQUIDITY, MIN_RESERVE, MOONBEAM_MAINNET, MOONBEAM_MOONBASE, MOONRIVER_MAINNET, MethodNotSupported, NEAR_MAINNET, NEAR_TESTNET, OASIS_MAINNET, OASIS_TESTNET, OEC_MAINNET, OEC_TESTNET, OP_KOVAN, OP_MAINNET, POLYGON_MAINNET, POLYGON_MUMBAI, Pair, Percent, Pool, Price, Rounding, Route, Router, SHIBUYA_TESTNET, SHIDEN_MAINNET, SONGBIRD_CANARY, StakingType, TARGET_DECIMAL, TELOS_MAINNET, TELOS_TESTNET, Token, TokenAmount, Trade, TradeType, Vault, WAGMI_FUJI_SUBNET, WAVAX, XDAI_MAINNET, currencyEquals, inputOutputComparator, tradeComparator };
//# sourceMappingURL=sdk.esm.js.map
