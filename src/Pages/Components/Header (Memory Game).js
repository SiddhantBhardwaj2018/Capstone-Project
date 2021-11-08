//Header Component
import React from "react";
import "./Header (Memory Game).css";
import { Container } from "react-bootstrap";

//ToDo: REMOVE MOVES
const Header = ({ moves, bestScore, handleRestart, setisGameActive }) => {
  const execute = () => {
    handleRestart()
    setisGameActive(true)
  }
  return (
    <div>
      <h1>Memory Game</h1>
      <Container>
        <div className="sub-header">
          <div className="moves">
            <span className="bold">Moves:</span>
            {moves}
          </div>
          <div className="reshuffle">
            <button onClick={execute}>
              Start/Restart
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;