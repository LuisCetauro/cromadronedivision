// next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    username: string;
    name?: string | null;
    executive?: string | null;
    isAdmin: boolean;
  }

  interface Session {
    user: {
      id: string;
      username: string;
      name?: string | null;
      executive?: string | null;
      isAdmin: boolean;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
    executive?: string | null;
    isAdmin: boolean;
  }
}
