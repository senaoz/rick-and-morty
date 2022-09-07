import Head from "next/head";
import Image from "next/image";
import LocContext from "../context/locationProvider";
import { useContext, useState } from "react";
import Link from "next/link";

// Lists locations. It is in list view. Shows type, dimension and resident count information.
// Clicking on any location opens the residents page.

// Search and filter locations. It is in list view. Shows type, dimension and resident count information.

export default function Home() {
  const { locations } = useContext(LocContext);

  const [filter, setFilter] = useState("");

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
        <li className="uppercase tracking-widest text-gray-400 p-0">NAME</li>
        <li className="uppercase tracking-widest text-gray-400 p-0">TYPE</li>
        <li className="uppercase tracking-widest text-gray-400 p-0">
          DIMENSION
        </li>
        <li className="uppercase tracking-widest text-gray-400 p-0">
          RESIDENT COUNT
        </li>
      </ol>
      <ul className="p-0 m-0">
        {filteredLocations.length === 0 ? (
          <p className="py-4 px-5 font-bold">
            No results found, please do another search.{" "}
          </p>
        ) : (
          filteredLocations.map((location) => (
            <Link href="#">
              <li
                key={location.id}
                className="bg-emerald-100 dark:bg-gray-900 rounded-lg capitalize flex items-center py-4 px-5 list-none grid gap-6 grid-cols-4 hover:bg-emerald-200 dark:hover:bg-gray-700"
              >
                <h4 className="m-0">{location.name}</h4>
                <p>{location.type}</p>
                <p>{location.dimension}</p>
                <p>{location.residents.length}</p>
              </li>
            </Link>
          ))
        )}
      </ul>

      <h2>Card design</h2>
      <ul className="p-0 list-none">
        {locations.map((location) => {
          return (
            <li
              className="bg-blue-100 dark:bg-gray-900 p-4 rounded-lg capitalize px-5"
              key={location.id}
            >
              <h3 className="m-0">{location.name}</h3>
              <div>
                <span className="uppercase tracking-widest text-gray-400 mr-2">
                  Type
                </span>
                <b>{location.type}</b>
              </div>
              <div>
                <span className="uppercase tracking-widest text-gray-400 mr-2">
                  Dimension
                </span>
                <b>{location.dimension}</b>
              </div>
              <div>
                <span className="uppercase tracking-widest text-gray-400 mr-2">
                  Resident Count
                </span>
                <b>{location.residents.length}</b>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
