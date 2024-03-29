import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  console.log('here');
  let doc = {};
  // const pattern = new RegExp(req.query.pattern);

  // if (pattern) {
  //   doc.courses = await req.db.collection('courses').find({ id: pattern }).toArray();
  // }

  // if (doc == null) {
  //   doc = {};
  // }

  res.json(doc);
});

handler.post(async (req, res) => {
  let data = req.body;
  data = JSON.parse(data);
  await req.db.collection('courses').insertOne(data);
  console.log('inserted data', data);
  res.json({
    message: 'success',
    data: data
  });
});

export default handler;
