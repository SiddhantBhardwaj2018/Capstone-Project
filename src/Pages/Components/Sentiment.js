import React, { useState, useEffect } from 'react';
import * as Icon from 'react-bootstrap-icons';



function Sentiment() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [sentiment, setSentiment] = useState()


    useEffect(() => {
        fetch("/Sentiment")
            .then(res => res.json())
            .then(
                async (data) => {
                    await setSentiment(data.sentiment)
                    await console.log(data)
                    await setIsLoaded(true)
                },
                async (error) => {
                    await setIsLoaded(true);
                    await setError(error);
                }
            )
    }, [])

    function updateSentiment() {
        fetch("/Sentiment")
            .then(result => result.json())
            .then(
                async (data) => {
                    await setSentiment(data.sentiment)
                    await console.log(data)
                    await setIsLoaded(true)
                }
            )
    }

    useEffect(() => {
        const timer = setInterval(updateSentiment, 60000) //While presenting to Meaghan, we can change it to 10 or 15 seconds
        return () => clearInterval(timer)
    }, []);

    const sentimentStyle = {
        color: "black",
        fontFamily: "Arial, Helvetica, sans-serif",
        borderCollapse: "collapse",
        width: "30%",
        border: "1px solid #ddd",
        padding: "8px",
        float: "right",
        position: "fixed",
        top: "40%",
        right: "0",
        transition: "border .2s ease-in-out"
    }

    if (error) {
        return <div style={sentimentStyle}>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div style={sentimentStyle}>Loading...</div>;
    } else {
        return (
                <div style={sentimentStyle}>
                    {Object.keys(sentiment).map(currency => {

                        if (sentiment[currency] == "Positive") {
                            return (
                                <div>
                                    <span>{currency}</span>
                                    <Icon.ArrowUp color="green" />
                                </div>
                            )
                        }
                        if (sentiment[currency] == "Negative") {
                            return (
                                <div>
                                    <span>{currency}</span>
                                    <Icon.ArrowDown color="red" />
                                </div>
                            )
                        }
                    }
                    )
                    }
                </div>
        )
    }
}

export default Sentiment;