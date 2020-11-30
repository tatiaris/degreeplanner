import nextConnect from "next-connect";
import middleware from "../../../middleware/database";
import cheerio from "cheerio";

const handler = nextConnect();
handler.use(middleware);

handler.get(async (req, res) => {
  let doc = {}
  doc.rows = []

  const response = await fetch(`https://www.slickcharts.com/sp500`)
  const htmlString = await response.text()
  const $ = cheerio.load(htmlString)

  $('tr').map((i, e) => {
    let ticker_details = $(e).text().trim().split('\n');
    const pchangeStr = ticker_details[6].trim()
    let stockObj = {
      name: ticker_details[1].trim(),
      ticker: ticker_details[2].trim(),
      weight: ticker_details[3].trim(),
      price: parseFloat(ticker_details[4].trim().replace(',', '')),
      cchange: parseFloat(ticker_details[5].trim()),
      pchange: parseFloat(pchangeStr.substring(1, pchangeStr.length - 2))
    }
    if (stockObj.name != 'Company') doc.rows.push(stockObj)
  })

  // console.log($($('tr')[1]).text().trim().split('\n'))

  res.json(doc);
});

handler.post(async (req, res) => {
  let data = req.body;
  data = JSON.parse(data);
  let doc = await req.db.collection("courses").insertOne(data);
  console.log("inserted data", data);
  res.json({
    message: "success",
    data: data
  });
});

export default handler;