import React, { useState, useEffect } from "react";
import { MFooter } from "../components/MFooter";
import { Mheader } from "../components/Mheader/";
import { Mnavbar } from "../components/Mnavbar/";
import { Table, Container, Button } from "react-bootstrap";

const Stocks = (): React.ReactNode => {
  const [stocks, setStocks] = useState([])
  const [percentSortDir, setPercentSortDir] = useState(-1);
  const [companySortDir, setCompanySortDir] = useState(-1);
  const stockTable = stocks.map((s, i) => {
    let color = "#28a745";
    let sign = "+";
    if (s.pchange <= 0) {
      color = "#dc3545";
      sign = "";
    };
    return (
      <tr key={`stock-row-${i}`}>
        <th>{i+1}</th>
        <th><a target="_blank" href={`https://finance.yahoo.com/quote/${s.ticker}`}>{s.name}</a></th>
        <th>{s.ticker}</th>
        <th>{s.price}</th>
        <th style={{ color: color }}>{sign}{s.cchange}</th>
        <th style={{ color: color }}>{sign}{s.pchange}%</th>
      </tr>
  )})
  const loadStocks = async () => {
    const res = await fetch(`/api/stocks`);
    const allCourses = await res.json();
    setStocks(allCourses.rows)
  };

  const sortByPercentChange = () => {
    let stocksCopy = stocks.sort((a, b) => {
      return (-1 * percentSortDir) * b.pchange + (percentSortDir) * a.pchange
    })
    setStocks(stocksCopy)
    setPercentSortDir(percentSortDir * -1)
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
        <Container>
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
                <th>Price ($)</th>
                <th>Price Change ($)</th>
                <th><Button onClick={sortByPercentChange} style={{ padding: "0px", background: "transparent", border: "0px", fontWeight: "bold", color: "black" }}>Percent Change (%)</Button></th>
              </tr>
            </thead>
            <tbody>{stockTable}</tbody>
          </Table>
        </Container>
    </>
  );
};

export default Stocks;
