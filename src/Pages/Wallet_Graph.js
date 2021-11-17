import React, { useState, useEffect, useContext } from "react";
import {
  AreaChart,
  Area,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
} from "recharts";
import { AuthContext } from "../Auth";

var startTime = new Date().getTime()
function updateGetPrice({ coins,CoinIds,setPortfolio,setlastPortfolio }){
    let string = "";
    let i = 0;
    //console.log(coins)
    for (const coin in coins) {
      if (i === 0) {
        string += CoinIds[coin];
      } else {
        string += "%2C" + CoinIds[coin];
      }
      i++;
    }

    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${string}&order=market_cap_desc&per_page=${
        Object.keys(coins).length
      }&page=1&sparkline=false`
    )
      .then((res) => res.json())
      .then((data) => {
        let valuation = 0;
        for (let j = 0; j < data.length; j++) {
          valuation += data[j].current_price * coins[data[j].name];
        }
        let time = new Date().getTime();
        let displayTime = new Date(time - startTime);
        let seconds = displayTime.getSeconds()
        let minutes = displayTime.getMinutes()
        let hours  = displayTime.getHours()
        if(seconds < 10){
          seconds = '0' + seconds
        }
        if(minutes < 10){
          minutes = '0' + minutes
        }
        setPortfolio((prevState) => [
          ...prevState,
          { Valuation:  Number.parseFloat(valuation).toFixed(2), Time: hours + ':' + minutes + ':' + seconds },
        ]);
        setlastPortfolio({Valuation: Number.parseFloat(valuation).toFixed(2), Time: time})
      });
  };
 

export default function Wallet_Graph() {
  let minute = 0
  const CoinIds = {
    Cardano: "cardano",
    Solana: "solana",
    Polkadot: "polkadot",
    Avalanche: "avalanche-2",
    Chainlink: "chainlink",
    Uniswap: "uniswap",
    Polygon: "matic-network",
    Algorand: "algorand",
    Cosmos: "cosmos",
    "FTX Token": "ftx-token",
    TRON: "tron",
    Filecoin: "filecoin",
    "Theta Network": "theta-token",
    Fantom: "fantom",
    Elrond: "elrond-erd-2",
    Tezos: "tezos",
    EOS: "eos",
    PancakeSwap: "pancakeswap-token",
    Flow: "flow",
    Kusama: "kusama",
    Quant: "quant-network",
    eCash: "ecash",
    THORChain: "thorchain",
    Olympus: "olympus",
    NEO: "neo",
    Harmony: "harmony",
    TerraUSD: "terrausd",
    BitTorrent: "bittorrent-2",
    Waves: "waves",
    Celo: "celo",
    "Theta Fuel": "theta-fuel",
    "Celsius Network": "celsius-degree-token",
    QTUM: "qtum",
    ICON: "icon",
    Decred: "decred",
    Telcoin: "telcoin",
    Ontology: "ontology",
    REN: "ren-protocol",
    "Rocket Pool": "rocket-pool",
    Nano: "nano",
    "Celer Network": "celer-network",
    Lisk: "lisk",
    "Function X": "fx-coin",
    Persistence: "persistence",
    Orbs: "orbs",
    Unibright: "unibright",
  };

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [portfolio, setPortfolio] = useState([]);
  const [lastPortfolio,setlastPortfolio] = useState({})

 let  coins = localStorage.getItem("coins")
 coins = JSON.parse(coins)

  useEffect(() => {
      const timer = setInterval(() => updateGetPrice({coins,CoinIds,setPortfolio,setlastPortfolio,minute}), 10000); 
    return () => clearInterval(timer);

  }, []);
  
  if(portfolio.length > 0){
      return (
          <div>
              <h1>Portfolio_Valuation: {lastPortfolio.Valuation}</h1>
              <LineChart data={portfolio} height={250} width={700}>
                <XAxis dataKey="Time" />
                <YAxis domain={["dataMin", "dataMax"]} />
                <Line dataKey="Valuation" />
              </LineChart>
          </div>
      )
  }else{
    return (
        <div>
          <h1>Please wait !! The Graph is Loading !!</h1>
        </div>
      );
      
  }

}

const styles = {
  container: {
    maxWidth: 600,
    //padding:"100 100",
    //margin: "0 50",
    
  },
};
