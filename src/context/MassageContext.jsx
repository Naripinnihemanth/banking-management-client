import React, { createContext, useState } from "react";

export const messageContext = createContext();

function MessageContextProvider({ children }) {
  const [message, setMessage] = useState({
    data: "",
    danger: false,
  });
  return (
    <messageContext.Provider value={{ message, setMessage }}>
      {children}
    </messageContext.Provider>
  );
}

export default MessageContextProvider;
