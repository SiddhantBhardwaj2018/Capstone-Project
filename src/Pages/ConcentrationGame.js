import React, { useState, useEffect, useContext } from 'react';
import app from '../firebase';
import { AuthContext } from '../Auth';

//import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Components/Header (Memory Game)";
import { Col, Container, Row } from "react-bootstrap";
import Card from "./Components/Card (Memory Game)";
import Finish from "./Components/Finish (Memory Game)";


// FisherYates Modern Shuffle Algorithm
function swap(array, i, j) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}
function shuffleCards(array) {
  const length = array.length;
  for (let i = length; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    const currentIndex = i - 1;
    swap(array, currentIndex, randomIndex);
  }
  return array;
}

const ConcentrationGame = () => {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageArr, setimageArr] = useState([]);
  const {currentUser} = useContext(AuthContext);

  fetch("/ConcentrationGame?uid=" + currentUser.uid)
          .then(res => res.json())
          .then(
              (data) => {
                  console.log(data);
                  setimageArr(data.concentration_data);
                  setIsLoaded(true);
              },
              (error) => {
                  setIsLoaded(true);
                  setError(error);
              });


  const [cards, setCards] = useState(() =>
    shuffleCards(imageArr.concat(imageArr))
  );
  const [openCards, setOpencards] = useState([]);
  const [matchedCards, setMatchedcards] = useState({});
  const [moves, setMoves] = useState(0);
  const [showmodel, setShowmodel] = useState(false);
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);

  const disable = () => {
    setShouldDisableAllCards(true);
  };

  const enable = () => {
    setShouldDisableAllCards(false);
  };

  const checkCompletion = () => {
    if (Object.keys(matchedCards).length === imageArr.length) {
      setShowmodel(true);
    }
  };

  const evaluate = () => {
    const [first, second] = openCards;
    enable();
    if (cards[first].name === cards[second].name) {
      setMatchedcards((prev) => ({ ...prev, [cards[first].name]: true }));
      setOpencards([]);
      // alert("you have found a match");
      return;
    }
    //ToDO: Possible Bug here with missing timeout stuff
    timeout.current = setTimeout(() => {
      setOpencards([]);
    }, 500);
  };

  const handleCardClick = (index) => {
    if (openCards.length === 1) {
      setOpencards((prev) => [...prev, index]);
      setMoves((moves) => moves + 1);
      disable();
    } else {
      clearTimeout(timeout.current);
      setOpencards([index]);
    }
  };
  useEffect(() => {
    let timeout = null;
    if (openCards.length === 2) {
      timeout = setTimeout(evaluate, 300);
    }
    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line
  }, [openCards]);

  useEffect(() => {
    // eslint-disable-next-line
    checkCompletion();
    // eslint-disable-next-line
  }, [matchedCards]);

  const checkIsFlipped = (index) => {
    return openCards.includes(index);
  };
  const checkIsInactive = (card) => {
    return Boolean(matchedCards[card.name]);
  };
  const handleRestart = () => {
    setMatchedcards({});
    setOpencards([]);
    setShowmodel(false);
    setMoves(0);
    setShouldDisableAllCards(false);
    setCards(shuffleCards(imageArr.concat(imageArr)));
  };


  if (error) {
    return <div>Error: {error.message}</div>;
} else if (!isLoaded) {
    return <div>Loading...</div>;
} else {
    return (
      <div>
        <Header
          moves={moves}
          //bestScore={bestScore}
          handleRestart={handleRestart}
        />
        <Container>
          <Row>
            {cards.map((card, index) => {
              return (
                <Col xs={6} md={3} lg={2}>
                  <Card
                    key={index}
                    card={card}
                    index={index}
                    isDisabled={shouldDisableAllCards}
                    isInactive={checkIsInactive(card)}
                    isFlipped={checkIsFlipped(index)}
                    onClick={handleCardClick}
                  />
                </Col>
              );
            })}
          </Row>
        </Container>
        <Finish
          showmodel={showmodel}
          moves={moves}
          //bestScore={bestScore}
          handleRestart={handleRestart}
        />
      </div>
    );
  }
};

export default ConcentrationGame;