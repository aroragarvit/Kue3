const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const balance = await deployer.getBalance();
  console.log(`Deploying with the account: ${deployer.address}`);
  console.log(`Account balance: ${balance.toString()}`);
  const MyContract = await hre.ethers.getContractFactory("Kue");
  const mycontract = await MyContract.deploy();
  await mycontract.deployed();
  console.log("MyContract deployed to:", mycontract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });