import React, { useEffect, useState } from "react";
import "./App.css";
import { LineChart, XAxis, YAxis, CartesianGrid, Line } from 'recharts';
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import Graph from "./Graph";
import DailyGraph from "./DailyGraph";
import Totals from "./Totals";
dayjs.extend(advancedFormat);

const APIURL = "https://api.coingecko.com/api/v3/";

function App() {
 
  const startDate = "10/1/2021";

  let today = new Date()
  let dd = String(today.getDate()).padStart(2, '0');
  let dd1 = String(today.getDate() - 1).padStart(2,'0')
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();
  const yesterday = mm + '/' + dd1 + '/' + yyyy;
  const endDate = mm + '/' + dd + '/' + yyyy;

  const freqInDays = 30;
  const freqInDays1 = 1;
  const amountToInvest = 200;
  const [coinData, setCoinData] = useState([]);
  const [coinData1, setCoinData1] = useState([]);
  const [realTimeInfo,setRealTimeInfo] = useState({"time": new Date().getTime(),"Price":0})
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  
  const getInfo = () => {
    const info = fetch("https://api.coingecko.com/api/v3/coins/solana").then(res => res.json()).then((data )=> {
      setRealTimeInfo({"time": new Date().getTime(),"Price":data.market_data.current_price.usd})
    })
  }

  console.log(realTimeInfo)


  const getCoinData = async (startDate, endDate) => {
    const startDateUnix = dayjs(startDate).format("X");
    const endDateUnix = dayjs(endDate).format("X");
    const yesterdayUnix = dayjs(yesterday).format("X");
    const range = `range?vs_currency=usd&from=${startDateUnix}&to=${endDateUnix}`;
    const range1 =  `range?vs_currency=usd&from=${yesterdayUnix}&to=${endDateUnix}`;
    const url = `${APIURL}/coins/solana/market_chart/${range}`;
    const url1 =  `${APIURL}/coins/solana/market_chart/${range1}`;
    setIsLoading(true);
    try {
      const coinResponse = await fetch(url);
      const coinResponse1 = await fetch(url1);
      const data = await coinResponse.json();
      const data1 = await coinResponse1.json();
      setCoinData(data);
      setCoinData1(data1);
      setError(false);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      setError(e);
    }
  };
  console.log(coinData1);
  useEffect(() => {
    getCoinData(startDate, endDate);
    const timer = setInterval(getInfo,1000)
    return () => clearInterval(timer)
},  []);


  
  if (isLoading) content = <div>Loading</div>;
  if (error) content = <div>{error}</div>;
 
  return (
      <div>
          <Graph
              priceArr={coinData.prices}
              freqInDays={freqInDays}
              amountToInvest={amountToInvest}
          />
          <br />
          <DailyGraph
              priceArr={coinData1.prices}
              amountToInvest={amountToInvest}
          />
          <br />
      </div>
  );
}

export default App;