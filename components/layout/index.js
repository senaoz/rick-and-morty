import Image from "next/image";
import Head from "next/head";
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div className="p-10">
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
      <footer className="pt-6 pb-10">
        <a
          href="https://www.linkedin.com/in/zsenaoz/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400"
        >
          Developed by Sena Oz.
        </a>
      </footer>
    </div>
  );
}
