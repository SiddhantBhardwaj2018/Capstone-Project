import React, { useState, useEffect } from 'react';


function News(){
    const [News,setNews] = useState("")
   useEffect(() => {
        fetch("/News").then(res => res.json()).then(data => setNews(data.news))
    },[])
    return (
        <div>
            <h1>{News}</h1>
        </div>
    )
}

export default News;