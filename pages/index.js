import { useLoc } from "../context/locationProvider";
import { useContext, useState } from "react";
import Link from "next/link";
import { getCharacters } from "../context/characterProvider";

// Lists locations. It is in list view. Shows type, dimension and resident count information.
// Clicking on any location opens the residents page.

export default function Home() {
  const [filter, setFilter] = useState("");
  const { locations } = useLoc();

  const filteredLocations = locations.filter((item) => {
    return Object.keys(item).some((key) =>
      item[key].toString().toLowerCase().includes(filter.toLocaleLowerCase())
    );
  });

  return (
    <div className="">
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search in locations..."
        className="input input-bordered input-sm w-full p-5 rounded-lg shadow dark:bg-gray-600"
      />
      <ul className="p-0 m-0">
        <ol className="list-none grid gap-6 grid-custom sm:grid-cols-4 px-5 mb-1">
          <li className="title">NAME</li>
          <li className="title">TYPE</li>
          <li className="title">DIMENSION</li>
          <li className="title sm:hidden">R.C.</li>
          <li className="title hidden sm:block">RESIDENT COUNT</li>
        </ol>
        {filteredLocations.length === 0 ? (
          <p className="py-4 px-5 font-bold">
            No results found, please do another search.
          </p>
        ) : (
          filteredLocations.map((location) => (
            <Link href={"/residents/" + location.id} key={location.id}>
              <li
                className="cursor-pointer
                bg-emerald-100 dark:bg-gray-900
                rounded-lg capitalize
                grid gap-6 grid-custom sm:grid-cols-4
                py-4 px-5 list-none
                overflow-x-auto
                hover:bg-emerald-200 dark:hover:bg-gray-700"
              >
                <h4 className="m-0">{location.name}</h4>
                <p>{location.type}</p>
                <p>{location.dimension}</p>
                <p className="sm:block">{location.residents.length}</p>
              </li>
            </Link>
          ))
        )}
      </ul>
    </div>
  );
}
