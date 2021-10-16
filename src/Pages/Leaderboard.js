import React, { useState, useEffect, useContext } from 'react';
import app from '../firebase';
import { AuthContext } from '../Auth';


function Leaderboard(){
    const { currentUser } = useContext(AuthContext)
    const [Leaderboard,setLeaderboard] = useState([])
    useEffect(() => {
        fetch(`/Leaderboard?uid=${currentUser.uid}`).then(res => res.json()).then(data => setLeaderboard(data.leaderboard))
    },[])
    return (
        <div>
            <h1>Leaderboard</h1>
            <button onClick = {() => app.auth().signOut()}>Sign Out</button>
        </div>
    )
}

export default Leaderboard;