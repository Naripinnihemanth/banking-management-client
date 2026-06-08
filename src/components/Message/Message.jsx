import React from "react";
import "./Message.css";
function Message({ message, status }) {
  return <div className={status ? "message danger" : "message"}>{message}</div>;
}

export default Message;
