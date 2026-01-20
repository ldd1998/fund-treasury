require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy"); // 添加这一行

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
};
