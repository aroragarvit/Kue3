import { ethers } from "hardhat";

async function main() {
  const Kue3 = await ethers.getContractFactory("Kue3");
  const kue3 = await Translat3.deploy(Kue3);
  await kue3.deployed();
  console.log("Translate deployed to:", kue3.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
