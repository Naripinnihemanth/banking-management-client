import react, { createContext, useState } from "react";

export const accountContext = createContext();
export default function AccountContextProvider({ children }) {
  const [accounts, setAccounts] = useState([]);
  return (
    <accountContext.Provider value={{ accounts, setAccounts }}>
      {children}
    </accountContext.Provider>
  );
}
