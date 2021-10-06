import React, { useState, useEffect } from 'react';


function Information(){
    const [Information,setInformation] = useState("")
    useEffect(() => {
        console.log("Hello");
        fetch("https://api.coingecko.com/api/v3/coins/cardano").then(res => res.json()).then(data => console.log(data))
    },[])
    return (
        <div>
            <h1>Hi</h1>
        </div>
    )
}

export default Information;