import Head from "next/head";
import Image from "next/image";
import LocContext from "../context/locationProvider";
import { useContext } from "react";

// Lists locations. It is in list view. Shows type, dimension and resident count information.
// Clicking on any location opens the residents page.

// Search and filter locations. It is in list view. Shows type, dimension and resident count information.

export default function Home() {
  const { locations } = useContext(LocContext);

  return (
    <div className="prose dark:prose-invert">
      <Head>
        <title>Rick and Morty App</title>
        <meta name="description" content="Developed for Aposto" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Hello</h1>
        <ul>
          {locations.map((location) => {
            return (
              <li className="">
                <h3>{location.name}</h3>
                Type: {location.type}
                Dimension: {location.dimension}
                Resident count: {location.residents.length}
              </li>
            );
          })}
        </ul>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
