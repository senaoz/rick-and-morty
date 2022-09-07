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
        <Link href="#">
          <Image src="/logo.png" width={250} height={95} />
        </Link>
      </header>
      <main>{children}</main>
      <footer>
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
