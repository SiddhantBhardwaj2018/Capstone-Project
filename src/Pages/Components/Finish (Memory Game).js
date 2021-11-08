//Finish Component
import React from "react";
import { Button} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
/*
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import "./style.css";*/

//ToDo: Remove Moves

const Finish = ({ handleRestart, showmodel, setShowmodel, moves }) => {
  const redirect  = () => {
    setShowmodel(false);
    window.location.href = '/Leaderboard';
  
  }

  return (
    <Modal show={showmodel}>
        <Modal.Header>
			<h2>Memory Game</h2>
          <Modal.Title>Hurray !!! You completed the game and have won 50 virtual currency !!</Modal.Title>
        </Modal.Header>
        <Modal.Body>You got {moves} moves.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleRestart}>
            Restart
          </Button>
          <Button variant="secondary" onClick= {redirect}>
            Go Back to Leaderboard
          </Button>
        </Modal.Footer>
    </Modal>
  );
};

export default Finish;