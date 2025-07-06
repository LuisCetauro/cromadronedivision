"use client";

import { useParams } from "next/navigation";
import Agras from "@/app/lib/Data/Drones/AgrasT50";
import Matrice from "@/app/lib/Data/Drones/Matrice400";
import FlipFly from "@/app/lib/Data/Drones/FlipFlyMore";
import Mavic4Pro from "@/app/lib/Data/Drones/Mavic4Pro";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const allDrones = [Agras, Matrice, FlipFly, Mavic4Pro];

export default function DroneDetails() {
  const params = useParams();
  const slug = params?.slug as string;
  const [state, setState] = useState(false);

  const drone = allDrones.find((d) => d.slug === slug);

  if (drone) {
    return (
      <section className="p-6 text-center">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">{drone.name}</h1>
          <Link href="/">Voltar</Link>
        </div>

        <p className="text-gray-600 mb-2">Tipo: {drone.type}</p>

        {drone.src && (
          <div className="relative w-32 h-32 mx-auto overflow-hidden">
            <Image
              src={drone.src}
              fill
              alt={drone.name}
              className="object-contain"
            />
          </div>
        )}
        {!state && (
          <div>
            <div>
              <h3>Conheça o {drone.name}</h3>
              <iframe
                className="w-full h-full"
                src={drone.video}
                title="Demonstração do Drone"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div>
              <button onClick={() => setState(true)}>
                Ver Descrição Completa
              </button>
            </div>
          </div>
        )}
        {state && (
          <div>
            <button onClick={() => setState(false)}>Esconder Descrição</button>
            <p className="mt-4 text-left">{drone.Description}</p>
          </div>
        )}
      </section>
    );
  } else {
    return (
      <section className="text-center p-6">
        <h1 className="text-2xl font-bold mb-4">Drone não encontrado</h1>
        <div className="flex flex-col gap-2 items-center">
          <h2 className="text-lg">Você deseja:</h2>
          <Link href="/">Voltar</Link>
          <Link href="/Contact">Falar com um especialista</Link>
        </div>
      </section>
    );
  }
}
