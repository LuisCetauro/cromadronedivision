import { AddContact } from "@/app/lib/Back/Actions/ContactActions";
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
          <Image src={executive.src} alt={`Foto de ${executive.name}`} fill />
        </div>
        <h2 className="text-xl font-semibold">{executive.name}</h2>
        <p>{executive.descp}</p>
        <Link href={`https://wa.me/${executive.wpp}`}>
          <div className="relative w-16 h-16">
            <Image fill alt="Logo WhatsApp" src="/Logos/wpp_logo.png" />
          </div>
        </Link>
      </div>

      <div className="mt-8">
        <form
          action={AddContact}
          className="flex flex-col justify-center items-center gap-2"
        >
          <h1 className="text-lg font-medium">
            Deixe Seu contato para que nós retornemos
          </h1>
          <input type="text" name="Name" placeholder="Seu nome" required />
          <input type="text" name="Phone" placeholder="Seu Telefone" required />
          <input type="email" name="Email" placeholder="Email" required />
          <input type="text" name="Bussines" placeholder="Empresa" />
          <textarea name="Message" placeholder="Sua mensagem" required />
          <input type="hidden" name="ExecutiveName" value={executive.name} />
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded"
          >
            Enviar
          </button>
        </form>
      </div>
    </section>
  );
}
