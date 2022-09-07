import { createContext, useContext, useEffect, useState } from "react";

const CharacterContext = createContext();

export default CharacterContext;

export const CharacterProvider = ({ children }) => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    (async () => {
      await fetch("https://rickandmortyapi.com/api/character")
        .then((res) => res.json())
        .then((data) => {
          setCharacters(data.results);
          const pages = data.info.pages;
          for (let i = 2; i <= pages; i++) {
            fetch("https://rickandmortyapi.com/api/character?page=" + i)
              .then((res) => res.json())
              .then((data) => {
                setCharacters((prev) => [...prev, ...data.results]);
              });
          }
        });
    })();
  }, []);

  console.log(characters);

  return (
    <CharacterContext.Provider value={{ characters }}>
      {children}
    </CharacterContext.Provider>
  );
};

export const getCharacters = () => useContext(CharacterContext);
