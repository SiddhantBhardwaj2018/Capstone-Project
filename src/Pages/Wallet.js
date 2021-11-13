import React, { useState, useEffect, useContext } from 'react';
import app from '../firebase';
import { AuthContext } from '../Auth';


//ToDo:This code needs to be modified to work like Sidd's Wallet Code
function Wallet(){
    const [Wallet,setWallet] = useState("");
    const {currentUser} = useContext(AuthContext);
    const [assets, setAssets] = useState([]);
    const [transaction_history, setTransaction_history] = useState([]);
    
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
              //console.log(data.Wallet);
              setAssets(data.Wallet['assets']);
              setTransaction_history(data.Wallet['transaction_history']);
              //console.log(data.Wallet['assets'])
              //console.log(transaction_history)
          });
        //fetch("/Wallet").then(res => res.json()).then(data => setWallet(data.Wallet))
    },[]);

    console.log(assets);
    /*const getCurrentPrice = () => {
        fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=' + sessionStorage.coinName + '&order=market_cap_desc&per_page=100&page=1')
    }

    useEffect(() => {
        const timer = setInterval(getCurrentPrice,20000) //This is 20 secs, While presenting to Meaghan, we can change it to 10 or 15 seconds
        return () => clearInterval(timer)
     },  []); */
    return (
        <div>
            <h1>{Wallet}</h1>
            <button onClick = {() => app.auth().signOut()}>Sign Out</button>
        </div>
    )
}

export default Wallet;