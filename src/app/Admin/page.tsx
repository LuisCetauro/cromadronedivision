// app/Admin/page.tsx
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Admin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        username,
        password,
      });

      if (result?.error) {
        setError("Credenciais inválidas");
      } else {
        console.log("entrou");
        router.push("/Admin/Dashboard");
      }
    } catch (err) {
      console.log(err);
      setError("Erro ao realizar login. Tente novamente.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center gap-2 text-sm bg-red-300 p-4 rounded-2xl mt-16"
    >
      <div className="flex flex-col justify-center items-center gap-2 text-sm bg-red-500 p-4 text-white rounded-2xl">
        <input
          className="border-4 border-black p-2 rounded-full"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="border-4 border-black p-2 rounded-full"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          className="mt-2 px-4 py-2 bg-green-600 text-white rounded"
          type="submit"
        >
          Login
        </button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
