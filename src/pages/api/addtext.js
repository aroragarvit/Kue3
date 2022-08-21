import { create } from "ipfs-http-client";

const projectId = process.env.PROJECT_ID;
const projectSecret = process.env.PROJECT_SECRET;
const auth = "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

export default async (req, res) => {
  const text = req.body.text;
  const cid = await client.add(text);
  res.json({
    cid: cid.path,
  });
};
