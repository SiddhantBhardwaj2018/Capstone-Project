//Card Component
import React, { useState, useEffect, useContext } from 'react';
import app from '../firebase';
import { AuthContext } from '../Auth';


import "./card.css"; //changed name
import backpic from "../../image/backpic.png";
// import frontpic from "../../image/bird1.jpg";
import classnames from "classnames";

const Card = ({ onClick, card, index, isInactive, isFlipped, isDisabled }) => {
  const handleClick = () => {
    !isFlipped && !isDisabled && onClick(index);
  };
  return (
    <div
      className={classnames("card", {
        "is-flipped": isFlipped,
        "is-inactive": isInactive,
      })}
      onClick={handleClick}
    >
      <div className="card-face card-font-face">
        <img src={backpic} alt="backpic" className="img" />
      </div>
      <div className="card-face card-back-face">
        <img src={card.image} alt="frontpic" className="img" />
      </div>
    </div>
  );
};
export default Card;