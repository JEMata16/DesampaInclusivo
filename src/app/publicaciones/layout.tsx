"use client";

import { createContext, useContext, useState } from "react";

interface MyContextType {
  value: boolean;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
}

const MyContext = createContext<MyContextType | undefined>(undefined);

export const MyProvider = ({ children }: { children: React.ReactNode }) => {
  const [value, setValue] = useState<boolean>(true);

  return (
    <MyContext.Provider value={{ value, setValue }}>
      {children}
    </MyContext.Provider>
  );
};

// Custom hook for easy access to the context
export const useMyContext = (): MyContextType => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyProvider");
  }
  return context;
};

export default function PublicacionesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { value: isChosen, setValue } = useMyContext();

  return (
    <>
      <nav className="grid grid-cols-2 ">
        <button
          onClick={() => setValue(true)}
          className={`flex items-center justify-center rounded-t-lg py-2  ${isChosen ? "bg-gray-200" : "hover:bg-gray-200"} `}
        >
          Mis Publicaciones
        </button>
        <button
          onClick={() => setValue(false)}
          className={`flex items-center justify-center rounded-t-lg py-2  ${!isChosen ? "bg-gray-200" : "hover:bg-gray-200"} `}
        >
          Usuarios
        </button>
      </nav>

      <div className="min-h-screen bg-gray-200">{children}</div>
    </>
  );
}
