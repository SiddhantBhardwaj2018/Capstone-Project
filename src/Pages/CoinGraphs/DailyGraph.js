import React from "react";
import { AreaChart, Area, LineChart, XAxis, YAxis, CartesianGrid, Line } from "recharts";
import dayjs from "dayjs";

export default function DailyGraph({ priceArr,  amountToInvest }) {
    const numOfPoints = priceArr.length;
    let coinAmount = 0;
    let totalInvested = 0;
    let dataArr = [];
    
    for (let i = 0; i < numOfPoints; i += 1) {
        const coinPrice = Math.round(priceArr[i][1]);
        coinAmount += amountToInvest / coinPrice;
        totalInvested += amountToInvest;
        const total = coinAmount * coinPrice;
        let date = new Date(priceArr[i][0]).toLocaleTimeString("en-US")
        if(date.includes("P")){
            let date1 = date.substring(0,date.lastIndexOf(":"))
            date = date1.substring(0,date1.lastIndexOf(":")) + date.substring(date.indexOf("P"))
        }else{
            let date1 = date.substring(0,date.lastIndexOf(":"))
            date = date1.substring(0,date1.lastIndexOf(":")) + date.substring(date.indexOf("A"))
        }
        

        dataArr.push({
          TotalInvested: totalInvested,
          CoinAmount: coinAmount,
          CoinPrice: coinPrice,
          Total: total,
          date: date,
        });
      }
    
    console.log(dataArr)

    return (
        <div style={styles.container}>
            <div style={styles.container}>
             <LineChart data={dataArr} height={250} width={700}>
                <XAxis dataKey="date"  />
                <YAxis domain={['dataMin', 'dataMax']} />
                <Line dataKey = "CoinPrice" />
            </LineChart>
  </div>
  </div>
    )
  };

  const styles = {
    container: {
      maxWidth: 700,
      margin: "0 auto",
    },
  };