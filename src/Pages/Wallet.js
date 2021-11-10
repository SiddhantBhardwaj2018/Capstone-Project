import React, { useState, useEffect, useContext } from 'react';
import app from '../firebase';
import Wallet_Graph from './Wallet_Graph';
import { AuthContext } from "../Auth";

function Wallet(){
    const [Wallet,setWallet] = useState("")
    const [coins, setCoins] = useState({});
    const { currentUser } = useContext(AuthContext);
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
            <button onClick = {() => app.auth().signOut()}>Sign Out</button>
        </div>
    )
}

export default Wallet;