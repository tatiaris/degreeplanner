import nextConnect from "next-connect";
import middleware from "../../../middleware/database";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const episode = req.query.episode;
  let doc = {}

  if (episode) {
    doc = await req.db.collection("interaction_collection").find({ episode: episode }).toArray();
  }
  
  if (doc == null) {
    doc = {};
  }

  res.json(doc);
});

handler.post(async (req, res) => {
  let data = req.body;
  data = JSON.parse(data);

  if (data.episode != "testing"){
    let doc = await req.db.collection("interaction_collection").insertOne(data);
    console.log("inserted data", data);
  }
  res.json({
    insertedDataType: "Interaction",
    message: "success",
    data: data
  });
});

export default handler;
