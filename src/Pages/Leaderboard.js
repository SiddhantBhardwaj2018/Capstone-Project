import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Auth';
import GameDiv from './Components/GameDiv';


function Leaderboard() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const { currentUser } = useContext(AuthContext)
    const [unames, setUname] = useState()

    useEffect(() => {
        document.title = "Cryptics Game";
        fetch(`/Leaderboard?uid=${currentUser.uid}`)
            .then(res => res.json())
            .then(
                (data) => {
                    console.log(unames);
                    setUname(data.Leaderboard);
                    setIsLoaded(true);
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
           <div className="flex-container" style = {{fontFamily: 'Kanit'}}>
                <GameDiv />
            <table className="flex-item" className="p-2 mx-auto">
                {unames.map(uname => (
                    <tr>
                        <td>
                            <h1>{uname.rank}</h1><h5>{uname.name}</h5>
                            <br />
                            <p>Profit: {uname.profit}</p>
                            <p>Most Traded Coin: {uname.most_traded_coin}</p>
                            <p>Account Balance: {uname.amount_balance}</p>
                        </td>
                    </tr>
                ))}
                </table>
            </div>
        );
    }
}

export default Leaderboard;