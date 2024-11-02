require("@nomicfoundation/hardhat-toolbox");
const { vars } = require("hardhat/config");
/** @type import('hardhat/config').HardhatUserConfig */
const ACCOUNT_PRIVATE_KEY = vars.get("ACCOUNT_PRIVATE_KEY");
module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  ignition: {
    requiredConfirmations: 1,
  },
  networks: {
    rei: {
      url: `https://rei-rpc.moonrhythm.io`,
      chainId: 55555,
      accounts: [ACCOUNT_PRIVATE_KEY],
    },
    myQuickNode: {
      url: "https://light-delicate-energy.ethereum-sepolia.quiknode.pro/d37f6796b28cace29d313c06a9565bdb64f06c48/",
      accounts: [ACCOUNT_PRIVATE_KEY],
    },
    bsc: {
      url: "https://light-delicate-energy.bsc.quiknode.pro/d37f6796b28cace29d313c06a9565bdb64f06c48",
      accounts: [ACCOUNT_PRIVATE_KEY],
    },
    polygon: {
      url: "https://light-delicate-energy.matic.quiknode.pro/d37f6796b28cace29d313c06a9565bdb64f06c48",
      accounts: [ACCOUNT_PRIVATE_KEY],
    },
    avalanche: {
      url: "https://light-delicate-energy.avalanche-mainnet.quiknode.pro/d37f6796b28cace29d313c06a9565bdb64f06c48/ext/bc/C/rpc/",
      accounts: [ACCOUNT_PRIVATE_KEY],
    },
  },
};
