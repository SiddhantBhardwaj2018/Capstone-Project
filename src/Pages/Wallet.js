import React, { useState, useEffect } from 'react';
import app from '../firebase';

function Wallet(){
    const [Wallet,setWallet] = useState("")
    useEffect(() => {
        fetch("/Wallet").then(res => res.json()).then(data => setWallet(data.Wallet))
    },[])
    return (
        <div>
            <h1>{Wallet}</h1>
            <button onClick = {() => app.auth().signOut()}>Sign Out</button>
        </div>
    )
}

export default Wallet;