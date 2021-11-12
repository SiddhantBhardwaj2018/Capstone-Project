import React, { useState, useEffect } from 'react';
import ReactBootstrapCarousel from "react-bootstrap-carousel";
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import Carousel from 'react-bootstrap/Carousel'

function GameDiv() {
    /*const divStyle = {
        backgroundColor: "black",
        height: "50%",
        width: "80%",
        margin: "50px"
    }*/
    return (
        <Carousel>
            <Carousel.Item interval={1000}>
                <a href="/Quiz"><h1>Quiz Game</h1></a>
                <br />
                <br />
            </Carousel.Item>
            <Carousel.Item interval={1000}>
                <a href="/ConcentrationGame"><h1>Concentration Game</h1></a>
                <br />
                <br />
            </Carousel.Item>
            <Carousel.Item>
                <a href="/SellingGame"><h1>Selling Game</h1></a>
                <br />
                <br />
            </Carousel.Item>
        </Carousel>
    )
}

export default GameDiv;