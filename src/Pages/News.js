import React, { useState, useEffect } from 'react';


function News(){
    const [News,setNews] = useState({})
    const [Sentiment, setSentiment] = useState({})
    const [loading,setLoading] = useState(true)
    let content;
    if(loading){
        content = "Loading"
    }

    useEffect(() => {
        fetch("/News").then(res => res.json()).then((data) => {
            setLoading(false)
            content = "";
            console.log(data.news)
            console.log(data.sentiment)
            setNews(data.news)
            setSentiment(data.sentiment)
        })
           
    },[])
    return (
        <div>
            <h1>News</h1>
            <p>{content}</p>
        </div>
    )
}

export default News;