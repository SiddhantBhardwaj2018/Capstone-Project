import React, { useState, useEffect } from 'react';
import BuySellWidget from './Components/BuySellWidget';
import GraphDiv from './CoinGraphs/GraphDiv.js';


function Information(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [name, setName] = useState("")
    const [image, setImage] = useState("")
    const [price, setPrice] = useState(0)
    const [changeRate, setChangeRate] = useState(0)

 

    if(props.location.state !== undefined){
        if (props.location.state.currency !== undefined) {
            sessionStorage.setItem('coinName', props.location.state.currency.toLowerCase());
        }
    }else{
        const currency_name = localStorage.getItem("currency") 
        sessionStorage.setItem('coinName',currency_name.toLocaleLowerCase());
    }
    
    useEffect(() => {
        document.title = "Cryptics Market";
        fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=' + sessionStorage.coinName + '&order=market_cap_desc&per_page=100&page=1')
        .then(res => res.json())
        .then(
            (data) => {
                if (data !== undefined) {
                    setName(data[0].name);
                    setImage(data[0].image);
                    setPrice(data[0].current_price);
                    setChangeRate(data[0].price_change_percentage_24h); 
                    setIsLoaded(true);
                }
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    }, [])

    function updateGetPrice() {
        fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=' + sessionStorage.coinName + '&order=market_cap_desc&per_page=100&page=1')
          .then(result => result.json())
          .then(
              (result) => {
                  if (result !== undefined) {
                      setPrice(result[0].current_price);
                      setChangeRate(result[0].price_change_percentage_24h);
                  }
              },
              (error) => {
                  setIsLoaded(true);
                  setError(error);
              }
          )
     }

     useEffect(() => {
        const timer = setInterval(updateGetPrice,1000) //While presenting to Meaghan, we can change it to 10 or 15 seconds
        return () => clearInterval(timer)
     },  []);

    const coinImageStyle = {
        width: 100,
        height: 100,
        float: "left",
        borderRadius: "50%",
        marginLeft: "10%",
        marginTop:"5%"
    };
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        let coinInfo = { 'coin': name, 'price': price };
        return (
           <div>
                <img src={image} style={coinImageStyle} />
                <h1>{name}</h1>
                <h1>{price}</h1>
                <h1>{changeRate}%</h1>
                <GraphDiv coin={sessionStorage.coinName}/>
                <BuySellWidget coinInfo={ coinInfo }/>
           </div>
            
            );
        }
    }

export default Information;