import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Auth';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

//testing upstream for Xinyi

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
        function changeBackground(e) {
            e.target.style.background = '#D3D3D3';
        }
        function revertBackground(e) {
            e.target.style.background = 'gray';
        }
        return (
            <div className = "m-2">
            <table className = "table" style={innerTablePadding}>
                <tr>
                    <td></td>
                    <td><h5 style = {{fontFamily: 'Kanit'}}>Coin</h5></td>
                    <td><h5 style = {{fontFamily: 'Kanit'}}>Price</h5></td>
                    <td><h5 style = {{fontFamily: 'Kanit'}}>Price Change in Past 24h</h5></td>
                    <td><h5 style = {{fontFamily: 'Kanit'}}>Price Change % in Past 24h</h5></td>
                </tr>
                {coins.map(coin => (
                    <tr >
                        <td><img style={imageStyle} src={coin.image} /></td>
                        <td><h3 style = {{fontFamily: 'Kanit'}}>{coin.name}</h3><h5 style = {{fontFamily: 'Kanit'}}>({coin.symbol})</h5></td>
                        <td style = {{fontFamily: 'Kanit'}}>{coin.current_price}</td>
                        <td style = {{fontFamily: 'Kanit'}}>{coin.price_change_24h}</td>
                        <td style = {{fontFamily: 'Kanit'}}>{coin.price_change_percentage_24h}</td>
                        <td><button style = {{fontFamily: 'Kanit'}} className=".btn-space btn btn-outline-primary mr-1" ><Link style={{ color: "blue" }} to={{ pathname: `/Information`, state: { currency: coin.id } }} target="_blank" onClick={() => {
                            localStorage.setItem("currency", coin.id)
                        }}> Detail </Link></button></td>
                    </tr>
                ))}
            </table>
            </div>
        );
    }
}

export default Market;