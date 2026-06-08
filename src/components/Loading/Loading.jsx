import React from "react";
import "./Loading.css";
import { BsBank2 } from "react-icons/bs";
function Loading() {
  return (
    <div className="loading">
      <BsBank2 className="bank-icon" />
      <div className="circle"></div>
    </div>
  );
}

export default Loading;
