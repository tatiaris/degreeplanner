import nextConnect from "next-connect";
import middleware from "../../../middleware/database";

const handler = nextConnect();
handler.use(middleware);

const tickers = {'IBM': 'International Business Machines'}

const getAdditionalInfo = async (tkr) => {
  let info = {}

  const infoType = 'Time Series (Daily)'

  // const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${tkr}&apikey=A46FRBO6IAUSCT0L&outputsize=full`;
  const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&outputsize=full&apikey=demo`
  await fetch(apiUrl, {
    method: 'get',
  }).then (
    response => response.json()
  ).then ( data => {
      if (typeof data[infoType] !== 'undefined') {
        const dates = Object.keys(data[infoType])
        const todayPrice = parseFloat(data[infoType][dates[0]]['4. close'])
        const yesterdayPrice = parseFloat(data[infoType][dates[1]]['4. close'])
        const monthAgoPrice = parseFloat(data[infoType][dates[21]]['4. close'])
        const yearAgoPrice = parseFloat(data[infoType][dates[253]]['4. close'])
        info.name = tickers[tkr]
        info.ticker = tkr
        info.price = todayPrice
        info.dailyChange = Math.round((todayPrice - yesterdayPrice)*10000/yesterdayPrice)/100
        info.monthlyChange = Math.round((todayPrice - monthAgoPrice)*10000/monthAgoPrice)/100
        info.yearlyChange = Math.round((todayPrice - yearAgoPrice)*10000/yearAgoPrice)/100
      } else {
        console.log(data);
        info.name = tickers[tkr]
        info.ticker = tkr
        info.price = 0
        info.dailyChange = 0
        info.monthlyChange = 0
        info.yearlyChange = 0
      }
    }
  ).catch((e) => console.log(e));

  return Promise.resolve(info)
}

const getData = async () => {
  let doc = {rows: []}

  let symbols = Object.keys(tickers)

  for (let i = 0; i < symbols.length; i++){
    await getAdditionalInfo(symbols[i]).then(
      info => {
        doc.rows.push(info)
      }
    ).catch((e) => console.log(e));
  }

  return Promise.resolve(doc)
}

handler.get(async (req, res) => {
  let doc = {}
  await getData().then(d => {
    doc = d
  }).catch(e => console.log(e))
  res.json(doc);
});

export default handler;