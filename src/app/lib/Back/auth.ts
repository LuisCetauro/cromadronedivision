import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";

import credentials from "next-auth/providers/credentials";
import { connectToDb } from "./connectToDb";
import { User } from "./Models/User";

const credentialsConfig = credentials({
  name: "Credentials",

  credentials: {
    username: {
      label: "username",
    },
    password: {
      label: "Password",
      type: "password",
    },
  },

  async authorize(credentials) {
    try {
      connectToDb();
      const user = await User.findOne({ username: credentials?.username });
      if (user) {
        if (user.password === credentials?.password) {
          return user;
        } else return null;
      }
    } catch (err) {
      console.log(err);
      throw new Error("Failed to login!");
    }
  },
});

const config = {
  providers: [credentialsConfig],
  secret: "asuidh98723y1sahdid219yd2121",

  callbacks: {
    async signIn({ user, profile }) {
      await connectToDb();
      const loggedIn = await User.findOne({ email: profile?.email });
      if (!loggedIn) {
        const newUser = new User({
          userId: user?.id,
          username: profile?.name,
          email: profile?.email,
          image: profile?.image,
        });
        await newUser.save();
      }
      return true;
    },
  },

  trustHost: true,
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
