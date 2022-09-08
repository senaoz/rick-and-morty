import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { useContext } from "react";

export default function Layout({ children }) {
  return (
    <div className="p-4 md:p-10">
      <Head>
        <title>Rick and Morty App</title>
        <meta name="description" content="Developed for Aposto" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="flex justify-between items-center mb-10">
        <Link href="/">
          <Image
            src="/logo.png"
            width={250}
            height={95}
            className="cursor-pointer"
            alt={"Rick and Morty Logo"}
          />
        </Link>
        <Link href="/">
          <button className="mt-4">Home</button>
        </Link>
      </header>
      <main>{children}</main>
      <footer className="pt-6 pb-10 text-gray-400">
        <p>Dark mode support is enabled via system preferences.</p>
        <a
          href="https://github.com/senaoz"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400"
        >
          Sena Oz
        </a>
      </footer>
    </div>
  );
}
