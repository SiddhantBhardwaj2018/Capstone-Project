import React, { useState, useEffect } from 'react';
import ReactBootstrapCarousel from "react-bootstrap-carousel";
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import Carousel from 'react-bootstrap/Carousel'
import QuizImage from "../image/quizGame.png"
import MemoryGame from "../image/memoryGame.png"
import SellingImage from "../image/tradingGame.png"

function GameDiv() {
    /*const divStyle = {
        backgroundColor: "black",
        height: "50%",
        width: "80%",
        margin: "50px"
    }*/

    const imgStyle = {
        height: "15%",
        width: "100%",
        maxHeight: "15%"
    }
    return (
        <Carousel>
            <Carousel.Item interval={2000}>
                <a href="Quiz"><img src={QuizImage} style={imgStyle} /></a>
                <br />
                <br />
            </Carousel.Item>
            <Carousel.Item interval={2000}>
                <a href="/ConcentrationGame"><img src={MemoryGame} style={imgStyle} /></a>
                <br />
                <br />
            </Carousel.Item>
            <Carousel.Item interval={2000}>
                <a href="/SellingGame"><img src={SellingImage} style={imgStyle} /></a>
                <br />
                <br />
            </Carousel.Item>
        </Carousel>
    )
}

export default GameDiv;