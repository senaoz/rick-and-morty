import { createContext, useContext, useEffect, useState } from "react";

const LocContext = createContext();

export default LocContext;

export const LocProvider = ({ children }) => {
  const [locations, setLocations] = useState([]);

  async function getLocations() {
    await fetch("https://rickandmortyapi.com/api/location")
      .then((res) => res.json())
      .then((data) => {
        setLocations(data.results);
        const pages = data.info.pages;
        for (let i = 2; i <= pages; i++) {
          fetch("https://rickandmortyapi.com/api/location?page=" + i)
            .then((res) => res.json())
            .then((data) => {
              setLocations((prev) => [...prev, ...data.results]);
            });
        }
      });
  }

  useEffect(() => {
    getLocations();
  }, []);

  return (
    <LocContext.Provider value={{ locations }}>{children}</LocContext.Provider>
  );
};

export const useLoc = () => useContext(LocContext);
