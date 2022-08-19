import IPFS from "ipfs-mini";
const ipfs = new IPFS({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

export const useIPFS = () => {
  const addText = async (text) => {
    const cid = await ipfs.add(text);
    return cid;
  };

  const getText = async (cid) => {
    const text = await ipfs.cat(cid);
    return text;
  };

  return {
    addText,
    getText,
  };
};
