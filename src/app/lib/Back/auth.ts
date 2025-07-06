// app/lib/Back/auth.ts
import type { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDb } from "./ConnectToDB";
import { User as UserModel } from "./Models/User";

const credentialsConfig = CredentialsProvider({
  name: "Credentials",
  credentials: {
    username: { label: "Username", type: "text" },
    password: { labelculus: "Password", type: "password" },
  },
  async authorize(credentials) {
    try {
      if (!credentials?.username || !credentials?.password) {
        throw new Error("Username and password are required");
      }

      await connectToDb();

      const user = await UserModel.findOne({ username: credentials.username });

      if (user && user.password === credentials.password) {
        return {
          id: user._id.toString(),
          name: user.username, // Usado pelo next-auth como o nome principal
          username: user.username,
          executive: user.executive,
          isAdmin: user.isAdmin,
        } as User;
      }

      return null;
    } catch (err) {
      console.error(err);
      throw new Error("Failed to login!");
    }
  },
});

const config: NextAuthOptions = {
  providers: [credentialsConfig],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user }) {
      try {
        await connectToDb();
        // Verifica pelo username, já que email não existe no modelo
        const exists = await UserModel.findOne({ username: user.username });
        return !!exists;
      } catch (err) {
        console.error(err);
        return false;
      }
    },
    async jwt({ token, user }) {
      // Adiciona os dados do usuário ao token JWT
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.executive = user.executive;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      // Adiciona os dados do token à sessão
      if (token && session.user) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.executive = token.executive;
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
  },
};

export const authOptions = config;
