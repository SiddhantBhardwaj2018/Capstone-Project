import React, { useState, useEffect } from 'react';


function Leaderboard(){
    const [Leaderboard,setLeaderboard] = useState("")
    useEffect(() => {
        fetch("/Leaderboard").then(res => res.json()).then(data => setLeaderboard(data.leaderboard))
    },[])

    return (
        <div>
            <h1>{Leaderboard}</h1>
        </div>
    )
}

export default Leaderboard;