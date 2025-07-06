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
    <section>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </div>
    </section>
  );
}
