import React, { useState, useEffect } from 'react';
import app from '../firebase';

function Leaderboard(){
    const [Leaderboard,setLeaderboard] = useState([])
    useEffect(() => {
        fetch("/Leaderboard").then(res => res.json()).then(data => setLeaderboard(data.leaderboard))
    },[])
    console.log(Leaderboard)
    return (
        <div>
            <h1>Leaderboard</h1>
            <button onClick = {() => app.auth().signOut()}>Sign Out</button>
        </div>
    )
}

export default Leaderboard;