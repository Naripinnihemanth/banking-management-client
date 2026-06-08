import React, { createContext, useState } from "react";

export const navContext = createContext();
function NavContextProvider({ children }) {
  const [element, setElement] = useState(null);
  return (
    <navContext.Provider value={{ element, setElement }}>
      {children}
    </navContext.Provider>
  );
}
export default NavContextProvider;
