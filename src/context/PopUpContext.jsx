import React, { createContext, useState } from "react";

export const popUpContext = createContext();
function PopUpContextProvider({ children }) {
  const [PopUp, setPopUp] = useState(null);
  return (
    <popUpContext.Provider value={{ PopUp, setPopUp }}>
      {children}
    </popUpContext.Provider>
  );
}

export default PopUpContextProvider;
