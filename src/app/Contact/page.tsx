import Andrew from "@/app/lib/Data/Executives/Andew";
import Image from "next/image";

export default function Contact() {
  return (
    <section className="text-center flex flex-col justify-center items-center">
      <h1>Fale com um especialista</h1>

      <div className="mt-6 flex flex-col items-center gap-4">
        <div className="relative h-40 w-40 rounded-2xl overflow-hidden">
          <Image
            src={Andrew.src}
            alt={`Foto de ${Andrew.name}`}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <h2 className="text-xl font-semibold">{Andrew.name}</h2>
        <p>{Andrew.descp}</p>
        <p>WhatsApp: {Andrew.wpp}</p>
      </div>
    </section>
  );
}
