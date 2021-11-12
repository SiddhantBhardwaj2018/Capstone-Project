import React, { useEffect, useState } from "react";
import { LineChart, XAxis, YAxis, CartesianGrid, Line } from 'recharts';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import Graph from "./Graph";
import DailyGraph from "./DailyGraph";
dayjs.extend(advancedFormat);

const APIURL = "https://api.coingecko.com/api/v3/";

function GraphDiv(props) {
 
  const startDate = "10/1/2021";

  let today = new Date()
  let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    var dd1 = null
    var mm1 = null
    if (dd == '01') {
        mm1 = parseInt(mm) - 1
        if ((mm == '02') || (mm == '04') || (mm == '06') || (mm == '08') || (mm == '09') || (mm == '11') || (mm == '01')) {
            dd1 = '31'
        } else if ((mm == '05') || (mm == '07') || (mm == '10') || (mm == '12')) {
            dd1 = '30'
        } else if (mm == '03') {
            if (yyyy % 4 == 0) {
                dd1 = '29'
            } else {
                dd1 = '28'
            }
        }
    } else {
        dd1 = parseInt(dd) - 1
        mm1 = mm
    }


    const yesterday = mm1 + '/' + dd1 + '/' + yyyy;
    const endDate = mm + '/' + dd + '/' + yyyy;
    console.log(yesterday);

  const freqInDays = 30;
  const freqInDays1 = 1;
  const amountToInvest = 200;
  const [coinData, setCoinData] = useState([]);
  const [coinData1, setCoinData1] = useState([]);
  const [index, setIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);




  const getCoinData = async (startDate, endDate) => {
    const startDateUnix = dayjs(startDate).format("X");
    const endDateUnix = dayjs(endDate).format("X");
    const yesterdayUnix = dayjs(yesterday).format("X");
    const range = `range?vs_currency=usd&from=${startDateUnix}&to=${endDateUnix}`;
      const range1 = `range?vs_currency=usd&from=${yesterdayUnix}&to=${endDateUnix}`;
      console.log(props.coin)
      const url = `${APIURL}/coins/${props.coin}/market_chart/${range}`;
      const url1 = `${APIURL}/coins/${props.coin}/market_chart/${range1}`;
    setIsLoaded(true);
    try {
      const coinResponse = await fetch(url);
      const coinResponse1 = await fetch(url1);
      const data = await coinResponse.json();
      const data1 = await coinResponse1.json();
      setCoinData(data);
        setCoinData1(data1);
        console.log(yesterday);
      setError(false);
      setIsLoaded(false);
    } catch (e) {
      setIsLoaded(false);
      setError(e);
    }
    };
  useEffect(() => {
    getCoinData(startDate, endDate);
},  []);
    console.log(coinData);
    
    let content = <div>No Data</div>;
    if (coinData && coinData.prices && coinData.prices.length > 0) {
        content = (
            <Tabs
                selectedIndex={index}
                onSelect={(index) => setIndex(index)}
                style={{ width: "50%" }}
            >
                <TabList>
                    <Tab>Monthly</Tab>
                    <Tab>Daily</Tab>
                </TabList>
                <TabPanel style={{ width: "50%" }}>
                    <Graph
                        priceArr={coinData.prices}
                        freqInDays={freqInDays}
                        amountToInvest={amountToInvest}
                    />
                </TabPanel>
                <TabPanel style={{ width: 1000 }}>
                    <DailyGraph
                        priceArr={coinData1.prices}
                        amountToInvest={amountToInvest}
                    />
                </TabPanel>
            </Tabs>


        );
    }
    if (isLoaded) content = <div>Loading</div>;
    if (error) content = <div>{error}</div>;
    return (
        <div>
            {content}
        </div>
    );
}

export default GraphDiv;