import React, { useContext } from "react";
import "./PopUp.css";
import { popUpContext } from "../../../context/PopUpContext";
function PopUp() {
  const { PopUp, setPopUp } = useContext(popUpContext);
  return PopUp != null ? <div className="pop-up">{PopUp}</div> : null;
}

export default PopUp;
