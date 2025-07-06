import type { NextAuthOptions, User } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDb } from "./ConnectToDB";
import { User as UserModel } from "./Models/User";

const credentialsConfig = CredentialsProvider({
  name: "Credentials",
  credentials: {
    username: { label: "Username" },
    password: { label: "Password", type: "password" },
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
          name: user.username,
          email: user.email,
          image: user.image,
          username: user.username,
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
  callbacks: {
    async signIn({ user }: { user: User }) {
      try {
        await connectToDb();
        const loggedIn = await UserModel.findOne({ email: user.email });
        if (!loggedIn) {
          return false;
        }
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
