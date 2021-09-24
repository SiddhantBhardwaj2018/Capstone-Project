import React, { useState, useEffect } from 'react';


function Wallet(){
    const [Wallet,setWallet] = useState("")
    useEffect(() => {
        fetch("/Wallet").then(res => res.json()).then(data => setWallet(data.Wallet))
    },[])
    return (
        <div>
            <h1>{Wallet}</h1>
        </div>
    )
}

export default Wallet;