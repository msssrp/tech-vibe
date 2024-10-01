require("@nomicfoundation/hardhat-toolbox");
const { vars } = require("hardhat/config");
/** @type import('hardhat/config').HardhatUserConfig */
const ACCOUNT_PRIVATE_KEY = vars.get("ACCOUNT_PRIVATE_KEY");
module.exports = {
  solidity: "0.8.20",
  networks: {
    rei: {
      url: `https://rei-rpc.moonrhythm.io`,
      chainId: 55555,
      accounts: [ACCOUNT_PRIVATE_KEY],
    },
  },
};
