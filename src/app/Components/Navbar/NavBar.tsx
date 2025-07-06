import Link from "next/link";
import Image from "next/image";

export default function NavBar() {
  return (
    <nav className="flex items-center justify-between px-4 h-16 bg-white shadow">
      <div className="relative w-16 h-16">
        <Image src="/croma_logo_embed.svg" alt="Logo Croma" fill />
      </div>
      <div className="flex gap-8">
        <Link href="/">Home</Link>
        <Link href="/Contact">Contact</Link>
      </div>
    </nav>
  );
}
