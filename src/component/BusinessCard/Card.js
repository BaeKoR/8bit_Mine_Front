import React from "react";
import { useNavigate } from "react-router-dom";

import "./card.css";

import Inform from "./Inform";


function Card() {
  


  return(
    <div className="middle">
      <div style={{position: "relative", backgroundColor:"#9CA8F0", height:"600px", width:"900px", marginTop:"100px"}} // 명함틀
      />
      <div style={{position: "relative", marginLeft:"-780px", marginTop:"-50px", fontSize:"20px"}}>
        <Inform/>
      </div>
    </div>
  );
}
export default Card;