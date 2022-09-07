import { createContext, useState, useEffect } from "react";

const LocContext = createContext();

export const LocProvider = ({ children }) => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/location")
      .then((res) => res.json())
      .then((data) => {
        setLocations(data.results);
      });
  }, []);

  console.log(locations);

  return (
    <LocContext.Provider value={{ locations }}>{children}</LocContext.Provider>
  );
};

export default LocContext;
