import React, { useState, useEffect, useContext } from 'react';
import app from '../firebase';
import Wallet_Graph from './Wallet_Graph';
import Wallet_Assets from './Wallet_Assets';
import { AuthContext } from "../Auth";

//My code:
function stringBuilder(coinList){
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


function Wallet(){
    const [Wallet,setWallet] = useState("");
    const {currentUser} = useContext(AuthContext);
    const [coins, setCoins] = useState({});
    const [assets, setAssets] = useState([]);
    //const [transaction_history, setTransaction_history] = useState([]);
    
    //ToDo: Make consts for current_price and for portfolio percentage
    //copy over Sidd's Wallet.js code and do it in his useEffect and use
    //coins instead of retrieving data from back-end
    useEffect(() => {
        const walletInfo = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'wallet': {"uid" : currentUser.uid} })
          };
          fetch('/Wallet', walletInfo)
          .then(response => response.json())
          .then(data => {
              setAssets(data.Wallet['assets']);
              setTransaction_history(data.Wallet['transaction_history']);
          });
    },[]);

    //Sidd's Code
    useEffect(() => {
        fetch("/Wallet").then(res => res.json()).then(data => setWallet(data.Wallet))
    },[])
    
    useEffect(() => {
      fetch(`Wallet_Graph?uid=${currentUser.uid}`)
        .then((res) => res.json())
        .then((data) => {
            const coins = data.unique_coins
            localStorage.setItem("coins",JSON.stringify(coins))});
    }, []);
  
    
    return (
        <div>
            <h1>{Wallet}</h1> 
            <Wallet_Graph />
        </div>
    )
}

export default Wallet;