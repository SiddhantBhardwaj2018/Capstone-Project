import React, { useState, useEffect } from 'react';
import app from '../firebase';

function Market(){
    const [Market,setMarket] = useState("")
    useEffect(() => {
        fetch("/Market").then(res => res.json()).then(data => setMarket(data.Market))
    },[])

    return (
        <div>
            <h1>{Market}</h1>
            <button onClick = {() => app.auth().signOut()}></button>
        </div>
    )
}

export default Market;