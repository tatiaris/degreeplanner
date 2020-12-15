import nextConnect from "next-connect";
import middleware from "../../../middleware/database";

const handler = nextConnect();
handler.use(middleware);

let tickers = {'IBM': 'IBM NAME'}
const loadTickers = async () => {
  await fetch('http://localhost:3000/api/get_sp_tickers', { method: 'get' }).then( response => response.json()).then (d => tickers = d)
}

const getAdditionalInfo = async (tkrs) => {
  let tickersInfo = []

  const tickersUrlString = tkrs.join(',')

  const apiUrl = `https://data.alpaca.markets/v1/bars/day?symbols=${tickersUrlString}&limit=300`
  await fetch(apiUrl, {
    method: 'get',
    headers: {
      'APCA-API-KEY-ID': 'PKEUPEV0O4YX6OLQBYTM',
      'APCA-API-SECRET-KEY': 'grMDCv7RE5AgKb2v6ekjRBtEx5T4qqOgU4xKiHrx'
    }
  }).then (
    response => response.json()
  ).then ( data => {
    const returnedTickers = Object.keys(data)
    for (let i = 0; i < returnedTickers.length; i++) {
      const tkr = returnedTickers[i]
      let info = {}
      if (typeof data[tkr] !== 'undefined') {
        const priceList = data[tkr]
        const todayData = priceList[priceList.length - 1]
        const yesterdayData = priceList[priceList.length - 2]
        const weekAgoData = priceList[priceList.length - 6]
        const monthAgoData = priceList[priceList.length - 21]
        const sixMonthAgoData = priceList[priceList.length - 126]
        const yearAgoData = priceList[priceList.length - 253]
        info.name = tickers[tkr]
        info.ticker = tkr
        info.price = todayData.c

        let latestAvailable = todayData
        try {
          info.dailyChange = Math.round((todayData.c - yesterdayData.c)*10000/yesterdayData.c)/100
          latestAvailable = yesterdayData
        } catch (error) {
          info.dailyChange = 0
        }
        try {
          info.weeklyChange = Math.round((todayData.c - weekAgoData.c)*10000/weekAgoData.c)/100
          latestAvailable = weekAgoData
        } catch (error) {
          info.weeklyChange = Math.round((todayData.c - latestAvailable.c)*10000/latestAvailable.c)/100
        }
        try {
          info.monthlyChange = Math.round((todayData.c - monthAgoData.c)*10000/monthAgoData.c)/100
          latestAvailable = monthAgoData
        } catch (error) {
          info.monthlyChange = Math.round((todayData.c - latestAvailable.c)*10000/latestAvailable.c)/100
        }
        try {
          info.sixMonthlyChange = Math.round((todayData.c - sixMonthAgoData.c)*10000/sixMonthAgoData.c)/100
          latestAvailable = sixMonthAgoData
        } catch (error) {
          info.monthlyChange = Math.round((todayData.c - latestAvailable.c)*10000/latestAvailable.c)/100
        }
        try {
          info.yearlyChange = Math.round((todayData.c - yearAgoData.c)*10000/yearAgoData.c)/100
        } catch (error) {
          info.yearlyChange = Math.round((todayData.c - latestAvailable.c)*10000/latestAvailable.c)/100          
        }
      } else {
        console.log(data);
        info.name = tickers[tkr]
        info.ticker = tkr
        info.price = 0
        info.dailyChange = 0
        info.monthlyChange = 0
        info.yearlyChange = 0
      }
      tickersInfo.push(info)
    }
  }).catch((e) => console.log(e));

  return Promise.resolve(tickersInfo)
}

const getData = async () => {
  let doc = {rows: []}

  let symbols = Object.keys(tickers)

  for (let i = 0; i < symbols.length; i += 100){
    await getAdditionalInfo(symbols.slice(i, i + 100)).then(
      info => {
        doc.rows = doc.rows.concat(info)
      }
    ).catch((e) => console.log(e));
  }

  return Promise.resolve(doc)
}

handler.get(async (req, res) => {
  let doc = {}
  await loadTickers()
  await getData().then(d => {
    doc = d
  }).catch(e => console.log(e))
  res.json(doc);
});

export default handler;