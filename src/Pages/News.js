import React, { useState, useEffect } from 'react';
import Sentiment from "./Components/Sentiment";
import '../App.css';
function News() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [news,setNews] = useState({})
   

    useEffect(() => {
        document.title = "Cryptics News";
        fetch("/News")
            .then(res => res.json())
            .then(
                async(data) => {
                    await console.log(data)
                    await setNews(data.news)
                    await setIsLoaded(true)
                },
                async(error) => {
                    await setIsLoaded(true);
                    await setError(error);
                }
            )
    }, [])
    


    const sentimentStyle = {
        fontFamily: "Arial, Helvetica, sans-serif",
        borderCollapse: "collapse",
        width: "30%",
        border: "1px solid #ddd",
        padding: "8px",
        float: "right",
        position: "fixed",
        top: "28.5%",
        right: "0"
    }

   

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Cryptics is organizing news...</div>;
    } else {
        return (
           <div>
                {/*news*/}
                <table className="newsTable">
                {news.map(post => (
                    <tr className="newsRow">
                        <td className="newsTitle"><a href={post.url} target="_blank" style={{color:"black"}}>{post.title}</a></td>
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
                <Sentiment style={sentimentStyle} />
            </div>
        )
    }
}

export default News;