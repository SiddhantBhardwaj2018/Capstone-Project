import React, { useState, useEffect } from 'react';


function Home(){
    const [Home,setHome] = useState("")
    useEffect(() => {
        fetch("/Home").then(res => res.json()).then(data => {
            setHome(data.home)
        })
    },[])
    return (
        <div>
            <h1>{Home}</h1>

        </div>
    )
}

export default Home;