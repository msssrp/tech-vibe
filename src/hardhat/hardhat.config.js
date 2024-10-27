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
  networks: {
    rei: {
      url: `https://rei-rpc.moonrhythm.io`,
      chainId: 55555,
      accounts: [ACCOUNT_PRIVATE_KEY],
    },
  },
};
