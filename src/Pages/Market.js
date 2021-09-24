import React, { useState, useEffect } from 'react';


function Market(){
    const [Market,setMarket] = useState("")
    useEffect(() => {
        fetch("/Market").then(res => res.json()).then(data => setMarket(data.Market))
    },[])

    return (
        <div>
            <h1>{Market}</h1>
        </div>
    )
}

export default Market;