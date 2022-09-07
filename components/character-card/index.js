import Image from "next/image";
import { useRef } from "react";

export default function CharacterCard(props) {
  const { id, name, image, status, species, gender, origin } = props;
  const lazyRoot = useRef(null);

  return (
    <div className="flex w-fit" key={id}>
      <Image
        loading={"lazy"}
        lazyRoot={lazyRoot}
        src={image}
        width={200}
        height={200}
        className="rounded-l-lg"
        alt={name}
        quality={10}
      />
      <div
        className="bg-blue-100 dark:bg-gray-900 p-4 rounded-r-lg capitalize px-5 character"
        key={id}
      >
        <h3 className="m-0 flex flex-start">{name}</h3>
        <div>
          {status === "Alive" ? (
            <span className="bg-green-300 rounded px-1 dark:text-gray-900">
              Alive
            </span>
          ) : status === "Dead" ? (
            <span className="bg-red-300 rounded px-1 dark:text-gray-900">
              Dead
            </span>
          ) : (
            <span className="bg-yellow-200 rounded px-1 dark:text-gray-900">
              Unknown
            </span>
          )}
        </div>
        <div>
          <span className="title mr-2">species</span>
          <b>{species}</b>
        </div>
        <div>
          <span className="title mr-2">gender</span>
          <b>{gender}</b>
        </div>
        <div>
          <span className="title mr-2">origin</span>
          <b>{origin}</b>
        </div>
      </div>
    </div>
  );
}
