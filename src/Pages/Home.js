import React, { useState, useEffect } from 'react';
import Fade from 'react-reveal/Fade';
import { ReactComponent as Landing } from './image/landing.svg';
import oneStop from './image/oneStop.jpg';
import game from './image/Game.png';

function Home(){
    const title1 = {
        color: "white",
        fontWeight: "bold",
        position: "absolute",
        top: "50%",
        left: "3%"
    }

    const title2= {
        color: "white",
        fontWeight: "bold",
        position: "absolute",
        top: "60%",
        left: "3%"
    }

    const title3 = {
        color: "white",
        fontWeight: "bold",
        position: "absolute",
        top: "70%",
        left: "3%"
    }

    const cardStyling = {
        marginTop: "5%",
        marginLeft: "10%",
        borderRadius: "30px",
        width: "80%",
        backgroundColor: "#82A9FD"
    }

    const priceStyle = {
        width: "80%",
        height: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "10%"
    }

    const gameStyle = {
        width: "50%",
        height: "50%",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "10%"
    }

    return (
        <div>
            <div>
                <Landing width={"100%"} height={"100%"} />
            <Fade bottom>
                <h1 style={title1}>A <span style={{color:"#F49500"}}>SUSTAINABLE</span></h1>
                    <h1 style={title2}>WAY TO <span style={{ color: "#F49500" }}>APPROAC</span>H </h1>
                    <h1 style={title3}>THE <span style={{ color: "#F49500" }}>FUTURE</span>  OF TRADING</h1>
            </Fade>
            </div>
            <Fade left>
                <div style={cardStyling}>
                    <img style={priceStyle} src={oneStop} />
                    <h1>One Stop Trading Simulator for Clean Cryptocurrency Only</h1>
                </div>
            </Fade>
            <Fade right>
                <div style={cardStyling}>
                    <img style={gameStyle} src={game} />
                    <h1>Gamification and Beginning-Friendly</h1>
                </div>
            </Fade>
        </div>
    )
}

export default Home;