import axios from "axios";

export default async (req, res) => {
  const x = await axios.get("https://ipfs.io/ipfs/" + req.body.cid);
  res.json({
    text: x.data,
  });
};
