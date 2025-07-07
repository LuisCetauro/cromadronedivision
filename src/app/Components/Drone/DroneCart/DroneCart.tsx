import Agras from "@/app/lib/Data/Drones/AgrasT50";
import Matrice from "@/app/lib/Data/Drones/Matrice400";
import FlipFly from "@/app/lib/Data/Drones/FlipFlyMore";
import Mavic4Pro from "@/app/lib/Data/Drones/Mavic4Pro";
import Link from "next/link";
import Image from "next/image";

interface Drone {
  name: string;
  type: string;
  Description: string;
  src: string;
  slug: string;
  video: string;
}

export default function DroneCart() {
  const drones: Drone[] = [Agras, Matrice, FlipFly, Mavic4Pro];

  return (
    <section className="text-center">
      {drones.map((drone) => (
        <article
          key={drone.name}
          className="border-4 border-red-500 p-4 m-4 rounded"
        >
          <h2>{drone.name}</h2>
          <p>{drone.type}</p>

          {drone.src && (
            <div className="relative w-16 h-16 mx-auto overflow-hidden">
              <Image
                src={drone.src}
                fill
                alt={drone.name}
                className="object-contain"
              />
            </div>
          )}
          <Link
            className="px-4  bg-green-600 text-white rounded"
            href={`/${drone.slug}`}
          >
            Conheça mais
          </Link>
        </article>
      ))}
    </section>
  );
}
