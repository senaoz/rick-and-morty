import { useLoc } from "../context/locationProvider";
import { useContext, useState } from "react";
import Link from "next/link";

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
    <>
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search in locations..."
        className="input input-bordered input-sm w-full p-5 rounded-lg shadow dark:bg-gray-600"
      />
      <ol className="list-none grid gap-6 grid-cols-4 px-5 mb-1">
        <li className="title">NAME</li>
        <li className="title">TYPE</li>
        <li className="title">DIMENSION</li>
        <li className="title">RESIDENT COUNT</li>
      </ol>
      <ul className="p-0 m-0">
        {filteredLocations.length === 0 ? (
          <p className="py-4 px-5 font-bold">
            No results found, please do another search.
          </p>
        ) : (
          filteredLocations.map((location) => (
            <Link href={"/residents/" + location.id} key={location.id}>
              <li className="bg-emerald-100 cursor-pointer dark:bg-gray-900 rounded-lg capitalize flex items-center py-4 px-5 list-none grid gap-6 grid-cols-4 hover:bg-emerald-200 dark:hover:bg-gray-700">
                <h4 className="m-0">{location.name}</h4>
                <p>{location.type}</p>
                <p>{location.dimension}</p>
                <p>{location.residents.length}</p>
              </li>
            </Link>
          ))
        )}
      </ul>
    </>
  );
}
