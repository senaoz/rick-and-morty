import { useState } from "react";
import CharacterCard from "../../components/character-card";
import { useLoc } from "../../context/locationProvider";
import Link from "next/link";

// Lists residents based on location in grid view. Shows name, image and species information.
// There are status indicators as follows; ( Alive: green, Dead: red, Unknown: yellow )

export async function getStaticProps({ params }) {
  const location = await fetch(
    "https://rickandmortyapi.com/api/location/" + params.id
  )
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });

  const residents = [];

  for (let i = 0; i < location.residents.length; i++) {
    const id = location?.residents[i]?.split("/").pop();
    await fetch(process.env.URL + "/character/" + id)
      .then((res) => res.json())
      .then((data) => {
        residents.push(data);
      });
  }

  return {
    props: {
      id: params.id,
      residents: residents,
      location,
    },
  };
}

export async function getStaticPaths() {
  const response = await fetch("https://rickandmortyapi.com/api/location");
  const data = await response.json();
  const locations = data.results;
  const pages = data.info.pages;
  for (let i = 2; i <= pages; i++) {
    const response = await fetch(
      "https://rickandmortyapi.com/api/location?page=" + i
    );
    const data = await response.json();
    locations.push(...data.results);
  }

  const paths = locations.map((location) => ({
    params: {
      id: location.id.toString(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export default function Residents({ residents, location }) {
  const [status, setStatus] = useState("All");
  const { locations } = useLoc();

  const filteredResidents = residents.filter((item) => {
    if (status === "All") {
      return true;
    } else {
      return item.status.includes(status);
    }
  });

  const randomLocations = [];

  if (locations.length > 0) {
    for (let i = 0; i < 3; i++) {
      const randomLocation =
        locations[Math.floor(Math.random() * locations.length)];
      randomLocations.push(randomLocation);
    }
  }
  console.log(randomLocations);

  return (
    <>
      <div className="flex flex-row justify-between items-end">
        <div>
          <h1>{location.name}</h1>
          <h3 className="mt-0 mb-10">
            <span className="title mr-2 font-light text-lg">Type</span>
            {location.type}
            <br />
            <span className="title mr-2 font-light text-lg">Dimension</span>
            {location.dimension} <br />
            <span className="title mr-2 font-light text-lg">
              Total Residents Count
            </span>
            {location.residents.length}
          </h3>
        </div>
        <select
          className="form-select appearance-none block w-full px-3 py-1.5 text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded  transition ease-in-out m-0 mb-10 w-32 dark:bg-gray-600 dark:text-white dark:border-gray-600"
          id="status"
          name="status"
          onChange={(e) => {
            setStatus(e.target.value);
          }}
        >
          <option value="All">All</option>
          <option value="Alive">Alive</option>
          <option value="Dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>

      <div className="grid gap-4 justify-items-center md:grid-cols-2 xl:grid-cols-3">
        {filteredResidents.length > 0 ? (
          filteredResidents.map((character) => {
            return (
              <CharacterCard
                key={character.id}
                id={character.id}
                name={character.name}
                image={character.image}
                status={character.status}
                species={character.species}
                gender={character.gender}
                origin={character.origin.name}
              />
            );
          })
        ) : (
          <h4 className="bg-blue-100 dark:bg-gray-900 p-8 rounded-lg w-full">
            There are no residents.
          </h4>
        )}
      </div>
      {/* similar locations */}
      <div>
        <h2 className="text-2xl font-bold mt-10 mb-5">Similar Locations</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {randomLocations.length > 2 ? (
            randomLocations.map((location) => {
              return (
                <Link href={`/residents/${location.id}`} key={location.id}>
                  <div className="w-full cursor-pointer  bg-white shadow dark:bg-gray-900 rounded-lg p-4">
                    <h3 className="p-0 m-0">{location.name}</h3>
                    <p>{location.type}</p>
                    <p>{location.dimension}</p>
                    <p>{location.residents.length} residents</p>
                  </div>
                </Link>
              );
            })
          ) : (
            <>Loading... </>
          )}
        </div>
      </div>
    </>
  );
}
