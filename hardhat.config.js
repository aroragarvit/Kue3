/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.9",
  paths: {
    sources: "./src/hardhat/contracts",
    artifacts: "./src/hardhat/artifacts",
    tests: "./src/hardhat/tests",
  },
};
