import Andrew from "@/app/lib/Data/Executives/Andew";
import Luis from "@/app/lib/Data/Executives/Luis";
import Jonathan from "@/app/lib/Data/Executives/Jonathan";
import Image from "next/image";
import Link from "next/link";

export default function Contact() {
  const executives = [Andrew, Luis, Jonathan];
  const randomIndex = Math.floor(Math.random() * executives.length);
  const executive = executives[randomIndex];

  return (
    <section className="text-center flex flex-col justify-center items-center">
      <h1>Fale com um especialista</h1>

      <div className="mt-6 flex flex-col items-center gap-4">
        <div className="relative h-40 w-40 rounded-2xl overflow-hidden">
          <Image
            src={executive.src}
            alt={`Foto de ${executive.name}`}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <h2 className="text-xl font-semibold">{executive.name}</h2>
        <p>{executive.descp}</p>
        <Link href={`https://wa.me/${executive.wpp}`}>Oi</Link>
      </div>
      <div>
        <form className="flex flex-col">
          <h1>Deixe Seu contat para que nós retornemos</h1>
          <input type="text" placeholder="Seu nome" />
          <input type="text" placeholder="Seu Telefone" />
          <input type="text" placeholder="Email" />
          <input type="text" placeholder="Empresa" />
          <input type="textarea" placeholder="Sua mensagem" />
          <button type="submit">Enviar</button>
        </form>
      </div>
    </section>
  );
}
