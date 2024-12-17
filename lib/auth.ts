import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "john@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Check if email and password are set
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        // Check if user exists in the database
        const existingUser = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });
        // If no user exists, return null
        if (!existingUser) {
          return null;
        }

        // Check if password is correct
        const isValid = existingUser.password === credentials.password;
        if (!isValid) {
          return null;
        }

        // If password is correct, return user
        return {
          id: `${existingUser.id}`, // biar ga dapet warning
          username: existingUser.username,
          email: existingUser.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Assign custom properties to the JWT
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      // Include custom properties in the session
      session.user.id = token.id;
      session.user.username = token.username;
      session.user.email = token.email;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
