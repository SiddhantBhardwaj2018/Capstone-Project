import React, { useState, useEffect, useContext } from "react";
import app from "../firebase";
import Wallet_Graph from "./Wallet_Graph";
import { AuthContext } from "../Auth";

function stringBuilder(coinList) {
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

  let string = "";
  let i = 0;
  for (const coin in coinList) {
    if (i === 0) {
      string += CoinIds[coin];
    } else {
      string += "%2C" + CoinIds[coin];
    }
    i++;
  }

  return string;
}

function Wallet() {
  const [Wallet, setWallet] = useState("");
  const { currentUser } = useContext(AuthContext);
  const [assets, setAssets] = useState({});
  const [transaction_history, setTransaction_history] = useState([]);

  //ToDo: Make consts for current_price and for portfolio percentage
  //copy over Sidd's Wallet.js code and do it in his useEffect and use
  //coins instead of retrieving data from back-end
  useEffect(() => {
    const walletInfo = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ wallet: { uid: currentUser.uid } }),
    };
    fetch("/Wallet", walletInfo)
      .then((response) => response.json())
      .then((data) => {
        //setAssets(data.Wallet['assets']);
        //Note: coins const is the coins im using which are different from Sidd's
        setTransaction_history(data.Wallet["transaction_history"]);
      });
  }, []);

  useEffect(() => {
    fetch(`/Wallet_Graph?uid=${currentUser.uid}`)
      .then((res) => res.json())
      .then((data) => {
        const coins = data.unique_coins;
        setTimeout(() => localStorage.setItem("coins", JSON.stringify(coins),1000));
      });
  }, []);

  useEffect(() => {
    let coins = localStorage.getItem("coins");
    coins = JSON.parse(coins);
    if (coins !== null) {
      let string = stringBuilder(coins);
      fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${string}&order=market_cap_desc&per_page=${
          Object.keys(coins).length
        }&page=1&sparkline=false`
      )
        .then((res) => res.json())
        .then((data) => {
          let info = {};
          let valuation = 0;

          for (let j = 0; j < data.length; j++) {
            valuation += data[j].current_price * coins[data[j].name];
            info[data[j].name] = {
              portfolio_per: data[j].current_price * coins[data[j].name],
              current_price: data[j].current_price,
              balance: coins[data[j].name],
            };
          }

          for (let index = 0; index < data.length; index++) {
            info[data[index].name].portfolio_per =
              info[data[index].name].portfolio_per / valuation;
          }
          setAssets(info);
        });
    }
  }, []);

  //console.log(assets);
  //console.log(transaction_history);
  let coins = localStorage.getItem("coins");
  coins = JSON.parse(coins);
  if(coins !== null){
    if(Object.keys(coins).length > 0){
      return (
        <div>
          <h1>Wallet</h1>
          <Wallet_Graph />
        </div>
      );
    }else{
      return(
        <div>
            <h1>You do not have enough coins</h1>
        </div>
    )
    }
  }else{
      return(
          <div>
              <h1>You do not have enough coins</h1>
          </div>
      )
  }
  
}

export default Wallet;
