import React from "react";
import "./ThirdGame.css";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import RandomPrice from './Components/Selling-Exercise';
dayjs.extend(advancedFormat);


const ThirdGame = () => {
    return (
      <div className = "ThirdGame">
        <RandomPrice min={0} max = {50} />
      </div>
    )
  }
  
  export default ThirdGame;