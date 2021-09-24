import React, { useState, useEffect } from 'react';


function Information(){
    const [Information,setInformation] = useState("")
    useEffect(() => {
        console.log("Hello");
        fetch("/Information").then(res => res.json()).then(data => setInformation(data.info))
    },[])
    return (
        <div>
            <h1>{Information}</h1>
        </div>
    )
}

export default Information;