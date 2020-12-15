import React, { useState, useEffect } from "react";
import { MFooter } from "../components/MFooter";
import { Mheader } from "../components/Mheader/";
import { Mnavbar } from "../components/Mnavbar/";
import { Table, Container, Button, Col, Row } from "react-bootstrap";

const Stocks = (): React.ReactNode => {
  const [stocks, setStocks] = useState([])
  const [priceSortDir, setPriceSortDir] = useState(-1);
  const [percentSortDir, setPercentSortDir] = useState(-1);
  const [weeklyPercentSortDir, setWeeklyPercentSortDir] = useState(-1);
  const [monthlyPercentSortDir, setMonthlyPercentSortDir] = useState(-1);
  const [sixMonthlyPercentSortDir, setSixMonthlyPercentSortDir] = useState(-1);
  const [yearlyPercentSortDir, setYearlyPercentSortDir] = useState(-1);
  const [companySortDir, setCompanySortDir] = useState(-1);
  const stockTable = stocks.map((s, i) => {
    let dailyColor = "#28a745";
    let dailySign = "+";
    let weeklyColor = "#28a745";
    let weeklySign = "+";
    let monthlyColor = "#28a745";
    let monthlySign = "+";
    let sixMonthlyColor = "#28a745";
    let sixMonthlySign = "+";
    let yearlyColor = "#28a745";
    let yearlySign = "+";

    if (s.dailyChange <= 0) {
      dailyColor = "#dc3545";
      dailySign = "";
    };
    if (s.weeklyChange <= 0) {
      weeklyColor = "#dc3545";
      weeklySign = "";
    };
    if (s.monthlyChange <= 0) {
      monthlyColor = "#dc3545";
      monthlySign = "";
    };
    if (s.sixMonthlyChange <= 0) {
      sixMonthlyColor = "#dc3545";
      sixMonthlySign = "";
    };
    if (s.yearlyChange <= 0) {
      yearlyColor = "#dc3545";
      yearlySign = "";
    };
    
    return (
      <tr key={`stock-row-${i}`}>
        <th>{i+1}</th>
        <th><a target="_blank" href={`https://finance.yahoo.com/quote/${s.ticker}`}>{s.name}</a></th>
        <th>{s.ticker}</th>
        <th>${s.price}</th>
        <th style={{ color: dailyColor }}>{dailySign}{s.dailyChange}%</th>
        <th style={{ color: weeklyColor }}>{weeklySign}{s.weeklyChange}%</th>
        <th style={{ color: monthlyColor }}>{monthlySign}{s.monthlyChange}%</th>
        <th style={{ color: sixMonthlyColor }}>{sixMonthlySign}{s.sixMonthlyChange}%</th>
        <th style={{ color: yearlyColor }}>{yearlySign}{s.yearlyChange}%</th>
      </tr>
  )})

  const loadStocks = async () => {
    const res = await fetch(`/api/stocks`);
    const allCourses = await res.json();
    setStocks(allCourses.rows)
  };

  const valueSort = (dir, setDir, val) => {
    let stocksCopy = stocks.sort((a, b) => {
      return (-1 * dir) * b[val] + (dir) * a[val]
    })
    setStocks(stocksCopy)
    setDir(dir * -1)
  }

  const sortByCompany = () => {
    let stocksCopy = stocks.sort((a, b) => {
      return ((a.name.toLowerCase() < b.name.toLowerCase()) ? (1 * companySortDir) : ((a.name.toLowerCase() > b.name.toLowerCase()) ? (-1 * companySortDir) : 0))
    })
    setStocks(stocksCopy)
    setCompanySortDir(companySortDir * -1)
  }

  useEffect(() => {
    loadStocks();
  }, [])

  return (
    <>
        <Mheader title={"Stocks"}/>
        <Col style={{ padding: "0" }}>
          <Table
            striped
            hover
            variant="light"
          >
            <thead style={{ background: "aquamarine" }}>
              <tr>
                <th>#</th>
                <th><Button onClick={sortByCompany} style={{ padding: "0px", background: "transparent", border: "0px", fontWeight: "bold", color: "black" }}>Company</Button></th>
                <th>Ticker</th>
                <th><Button onClick={e => valueSort(priceSortDir, setPriceSortDir, 'price')} style={{ padding: "0px", background: "transparent", border: "0px", fontWeight: "bold", color: "black" }}>Price</Button></th>
                <th><Button onClick={e => valueSort(percentSortDir, setPercentSortDir, 'dailyChange')} style={{ padding: "0px", background: "transparent", border: "0px", fontWeight: "bold", color: "black" }}>1 Day</Button></th>
                <th><Button onClick={e => valueSort(weeklyPercentSortDir, setWeeklyPercentSortDir, 'weeklyChange')} style={{ padding: "0px", background: "transparent", border: "0px", fontWeight: "bold", color: "black" }}>7 Days</Button></th>
                <th><Button onClick={e => valueSort(monthlyPercentSortDir, setMonthlyPercentSortDir, 'monthlyChange')} style={{ padding: "0px", background: "transparent", border: "0px", fontWeight: "bold", color: "black" }}>1 Month</Button></th>
                <th><Button onClick={e => valueSort(sixMonthlyPercentSortDir, setSixMonthlyPercentSortDir, 'sixMonthlyChange')} style={{ padding: "0px", background: "transparent", border: "0px", fontWeight: "bold", color: "black" }}>6 Month</Button></th>
                <th><Button onClick={e => valueSort(yearlyPercentSortDir, setYearlyPercentSortDir, 'yearlyChange')} style={{ padding: "0px", background: "transparent", border: "0px", fontWeight: "bold", color: "black" }}>1 Year</Button></th>
              </tr>
            </thead>
            <tbody>{stockTable}</tbody>
          </Table>
        </Col>
    </>
  );
};

export default Stocks;
