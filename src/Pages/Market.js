import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Auth';
import { Link } from 'react-router-dom';



function Market() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [coins, setCoins] = useState([]);
    const  { currentUser } = useContext(AuthContext)

    useEffect(() => {
        document.title = "Cryptics Market";
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

    useEffect(() => {
        fetch(`/Wallet_Graph?uid=${currentUser.uid}`)
          .then((res) => res.json())
          .then((data) => {
            const coins = data.unique_coins;
            localStorage.setItem("coins", JSON.stringify(coins));
          });
      }, []);

    const imageStyle = {
        width: "40%",
        height: "40%"
    }

    const innerTablePadding = {
            paddingTop: "50%"
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <table style={innerTablePadding}>
                <tr>
                    <td></td>
                    <td><h3>Coin</h3></td>
                    <td><h3>Price</h3></td>
                    <td><h3>Price Change in Past 24h</h3></td>
                    <td><h3>Price Change % in Past 24h</h3></td>
                </tr>
                {coins.map(coin => (
                    <tr>
                        <td><img style={imageStyle} src={coin.image} /></td>
                        <td><h3>{coin.name}</h3><h5>{coin.symbol}</h5></td>
                        <td>{coin.current_price}</td>
                        <td>{coin.price_change_24h}</td>
                        <td>{coin.price_change_percentage_24h}</td>
                        <td><button><Link to={{ pathname: `/Information`, state: { currency: coin.id } }} target = "_blank" onClick={() => {
                            localStorage.setItem("currency", coin.id)
                            }}> Detail </Link></button></td>
                    </tr>
                ))}
            </table>
        );
    }
}

export default Market;