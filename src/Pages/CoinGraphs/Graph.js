import React from "react";
import { AreaChart, Area, LineChart, XAxis, YAxis, CartesianGrid, Line } from "recharts";
import dayjs from "dayjs";

export default function Graph({ priceArr, freqInDays, amountToInvest }) {
  const numOfDays = priceArr.length;
  let coinAmount = 0;
  let totalInvested = 0;
  let dataArr = [];

  for (let i = 0; i < numOfDays; i += freqInDays) {
    const coinPrice = Math.round(priceArr[i][1]);
    coinAmount += amountToInvest / coinPrice;
    totalInvested += amountToInvest;
    const total = coinAmount * coinPrice;
    const date = dayjs(priceArr[i][0]).format("MM/DD/YYYY");

    dataArr.push({
      TotalInvested: totalInvested,
      CoinAmount: coinAmount,
      CoinPrice: coinPrice,
      Total: total,
      date: date,
    });
  }

  
  return (
  <div style={styles.container}>
     <div style={styles.container}>
      <LineChart data={dataArr} height={250} width={700}>
        <XAxis dataKey="date"  />
        <YAxis domain={['dataMin', 'dataMax']} />
        <Line dataKey = "CoinPrice" />
      </LineChart>
  </div>
  </div>);
}

const styles = {
  container: {
    maxWidth: 700,
    margin: "0 auto",
  },
};