'use client'
import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const AppContext = createContext();

// Custom hook for consuming the context
export function useAppContext() {
  return useContext(AppContext);
}

// Provider component
export function AppProvider({ children }) {
  const API_KEY = process.env.NEXT_PUBLIC_COUNTRY_API_KEY;
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  // Fetch countries on mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch("https://api.countrystatecity.in/v1/countries", {
          headers: { "X-CSCAPI-KEY": API_KEY }
        });
        if (!res.ok) throw new Error("Failed to fetch countries");
        const data = await res.json();
        setCountries(data);
      } catch (error) {
        setCountries([]);
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, [API_KEY]);

  // Fetch states
  const fetchStates = async (countryIso2) => {
    if (countryIso2) {
      try {
        const res = await fetch(`https://api.countrystatecity.in/v1/countries/${countryIso2}/states`, {
          headers: { "X-CSCAPI-KEY": API_KEY }
        });
        if (!res.ok) throw new Error("Failed to fetch states");
        const data = await res.json();
        setStates(data);
      } catch (error) {
        setStates([]);
        setCities([]);
        console.error("Error fetching states:", error);
      }
    } else {
      setStates([]);
      setCities([]);
    }
  };

  // Fetch cities
  const fetchCities = async (countryIso2, stateIso2) => {
    if (countryIso2 && stateIso2) {
      try {
        const res = await fetch(`https://api.countrystatecity.in/v1/countries/${countryIso2}/states/${stateIso2}/cities`, {
          headers: { "X-CSCAPI-KEY": API_KEY }
        });
        if (!res.ok) throw new Error("Failed to fetch cities");
        const data = await res.json();
        setCities(data);
      } catch (error) {
        setCities([]);
        console.error("Error fetching cities:", error);
      }
    } else {
      setCities([]);
    }
  };

  return (
    <AppContext.Provider value={{
      countries, states, cities,
      fetchStates, fetchCities
    }}>
      {children}
    </AppContext.Provider>
  );
} 