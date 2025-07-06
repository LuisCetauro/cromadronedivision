import { AddContact } from "@/app/lib/Back/Actions/ContactActions";
import Image from "next/image";
import Link from "next/link";
import { getPrioOrder } from "../lib/Back/Actions/ExecutiveActions";

export default async function Contact() {
  const res = await getPrioOrder();

  return (
    <section className="text-center flex flex-col justify-center items-center">
      <h1>Fale com um especialista</h1>
      <div className="mt-6 flex flex-col items-center gap-4">
        <div className="relative h-36 w-36 rounded-2xl overflow-hidden">
          <Image src={res?.src} alt={`Foto de ${res?.executive}`} fill />
        </div>
        <h2 className="text-xl font-semibold">{res?.executive}</h2>
        <p>{res?.descp}</p>
        <Link href={`https://wa.me/${res?.wpp}`}>
          <div className="relative w-16 h-16">
            <Image fill alt="Logo WhatsApp" src="/Logos/wpp_logo.png" />
          </div>
        </Link>
      </div>
      <div className="mt-8">
        <form
          action={AddContact}
          className="flex flex-col justify-center items-center gap-2 text-sm bg-red-300 p-2 rounded-2xl"
        >
          <h1 className=" font-medium">
            Deixe Seu contato para que nós retornemos
          </h1>
          <div className="flex flex-col justify-center items-center gap-2 text-sm bg-red-500 p-4 text-white rounded-2xl">
            <input
              type="text"
              name="Name"
              placeholder="Seu nome"
              required
              className="border-4 border-black p-2 rounded-full"
            />
            <input
              className="border-4 border-black p-2 rounded-full"
              type="text"
              name="Phone"
              placeholder="Seu Telefone"
              required
            />
            <input
              type="email"
              name="Email"
              placeholder="Email"
              required
              className="border-4 border-black p-2 rounded-full"
            />
            <input
              type="text"
              name="Bussines"
              placeholder="Empresa"
              className="border-4 border-black p-2 rounded-full"
            />
            <textarea
              name="Message"
              placeholder="Sua mensagem"
              required
              className="border-4 border-black p-2 rounded-xl h-24"
            />
            <input type="hidden" name="ExecutiveName" value={res?.executive} />
            <button
              type="submit"
              className="mt-2 px-4 py-2 bg-green-600 text-white rounded"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
