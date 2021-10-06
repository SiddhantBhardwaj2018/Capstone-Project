import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Information(props) {
    const location = useLocation();
    const [Information,setInformation] = useState("")
    useEffect(() => {
        console.log("Hello");
        fetch("/Information").then(res => res.json()).then(data => setInformation(data.info))
    },[])
    return (
        <div>
            <h1>{props.location.state.currency}</h1>
        </div>
    )
}

export default Information;