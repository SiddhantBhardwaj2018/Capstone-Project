import React, { useState, useEffect, useContext } from 'react';
import app from '../firebase';
import { AuthContext } from '../Auth';


function Leaderboard() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const { currentUser } = useContext(AuthContext)
    const [unames, setUname] = useState([])

    useEffect(() => {
        fetch(`/Leaderboard?uid=${currentUser.uid}`)
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true);
                    setUname(data.Leaderboard);
                    console.log(unames);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
        )
    }, [])


    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
           <table>
                {unames.map(uname => (
                    <tr>
                        <td><h1>{uname.rank}</h1><h5>{uname.name}</h5></td>
                    </tr>
                ))}
           </table>
        );
    }
}

export default Leaderboard;