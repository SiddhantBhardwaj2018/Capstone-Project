import React, { useState, useEffect } from 'react';
import * as Icon from 'react-bootstrap-icons';

function News() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [news,setNews] = useState({})
    const [sentiment, setSentiment] = useState()
   

    useEffect(() => {
        fetch("/News")
            .then(res => res.json())
            .then(
                async(data) => {
                    await setSentiment(data.sentiment)
                    await console.log(data)
                    await setNews(data.news.reddit_news)
                    await setIsLoaded(true)
                },
                async(error) => {
                    await setIsLoaded(true);
                    await setError(error);
                }
            )
    }, [])

    const newsStyle = {
        ".news": {
            fontFamily: "Arial, Helvetica, sans-serif",
            borderCollapse: "collapse",
            width: "100%",
            border: "1px solid #ddd",
            padding: "8px"
        },
        ".news td, .news th": { border: "1px solid #ddd", padding: "8px" },
        ".news tr:nth-child(even)": { backgroundColor: "#f2f2f2" },
        ".news tr:hover": { backgroundColor: "#ddd" }
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div>
                {/*sentiment*/}
                {Object.keys(sentiment).map(currency => {
                    
                    if (sentiment[currency] == "Positive") {
                        return (
                            <div>
                                <span>{currency}</span>
                                <Icon.ArrowUp color="green"/>
                            </div>
                        )
                    }
                    if (sentiment[currency] == "Negative") {
                        return (
                            <div>
                                <span>{currency}</span>
                                <Icon.ArrowDown color="red"/>
                            </div>
                            )
                    }
                }
                )
                }

                {/*news*/}
                <table className="news" style={newsStyle}>
                {news.map(post => (
                    <tr>
                        <td><a href={post.url}>{post.title}</a></td>
                        <td><p>Author: {post.redditor}</p>
                        <p>Published Date: {post["published date"]}</p></td>
                        {/*
                        {post.comments.map(comment => (
                            <td>
                                <p>{comment}</p>
                                <br />
                            </td>
                            ))}
                        <br />
                        */}
                    </tr>
                    
                ))}
                </table>
            </div>
        )
    }
}

export default News;