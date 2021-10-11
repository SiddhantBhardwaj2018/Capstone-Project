import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import app from '../firebase';


function Market() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [coins, setCoins] = useState([]);

    useEffect(() => {
        fetch("/Market")
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true);
                    setCoins(data.Market);
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
            <div><button onClick = {() => app.auth().signOut()}></button>
            <table>
                {coins.map(coin => (
                    <tr>
                        <td><img src={coin.image} /></td>
                        <td><h1>{coin.name}</h1><h5>{coin.symbol}</h5></td>
                        <td>{coin.current_princ}</td>
                        <td>{coin.price_change_24h}</td>
                        <td>{coin.price_change_percentage_24h}</td>
                        <td><button><Link to={{ pathname: `/Information`, state: { currency: coin.name } }}> Detail </Link></button></td>
                    </tr>
                ))}
            </table>
            </div>
        );
    }
}

export default Market;
