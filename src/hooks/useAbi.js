import kueContract from "../hardhat/artifacts/src/hardhat/contracts/kueContract.sol/Kue.json";

export const useAbi = () => {
  const abi = kueContract.abi;
  return abi;
};


