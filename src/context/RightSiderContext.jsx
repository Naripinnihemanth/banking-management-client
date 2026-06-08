import React, { createContext, useState } from "react";

export const siderContext = createContext();

function RightSiderContextProvider({ children }) {
  const [sider, setSider] = useState(null);
  return (
    <siderContext.Provider value={{ sider, setSider }}>
      {children}
    </siderContext.Provider>
  );
}

export default RightSiderContextProvider;
