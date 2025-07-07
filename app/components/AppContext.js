'use client'
import React, { createContext, useContext, useState } from "react";

// Create the context
const AppContext = createContext();

// Custom hook for consuming the context
export function useAppContext() {
  return useContext(AppContext);
}

// Provider component
export function AppProvider({ children }) {
  // Example global state (can be extended)
  const [sampleValue, setSampleValue] = useState("Hello from context!");

  return (
    <AppContext.Provider value={{ sampleValue, setSampleValue }}>
      {children}
    </AppContext.Provider>
  );
} 