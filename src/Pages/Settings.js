import React, { useState, useEffect } from 'react';


function Settings(){
    const [setting,setSetting] = useState("")
  useEffect(() => {
        fetch("/Setting").then(res => res.json()).then(data => setSetting(data.setting))
    },[])

    return (
        <div>
            <h1>{setSetting}</h1>
        </div>
    )
}

export default Settings;