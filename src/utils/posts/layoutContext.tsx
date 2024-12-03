"use client";
import { createContext, useContext, useState } from "react";

interface MyContextType {
  value: boolean;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
}

const MyContext = createContext<MyContextType | undefined>(undefined);

export default function MyProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [value, setValue] = useState<boolean>(true);

  return (
      <MyContext.Provider value={{ value, setValue }}>
          {children}
      </MyContext.Provider>
  );
}


// Custom hook for easy access to the context
export const useMyContext = (): MyContextType => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyProvider");
  }
  return context;
};