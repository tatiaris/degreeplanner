import nextConnect from "next-connect";
import middleware from "../../../middleware/database";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  let doc = await req.db.collection("participants").find().toArray();
  if (doc == null) {
    doc = [];
  }
  res.json(doc);
});

handler.post(async (req, res) => {
  let data = req.body;
  data = JSON.parse(data);

  let doc = await req.db.collection("participants").insertOne(data);
  console.log("inserted data", data);

  res.json({
    insertedDataType: "Participant",
    message: "success",
    data: data
  });
});

export default handler;
