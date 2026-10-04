import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60, // 8 hours
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email.toLowerCase().trim() },
        });

        if (!user) {
          throw new Error("Invalid credentials");
        }

        if (user.status !== "ACTIVE") {
          throw new Error("Account is not active");
        }

        if (user.lockedUntil && user.lockedUntil > new Date()) {
          throw new Error("Account temporarily locked. Try again later.");
        }

        const valid = await bcrypt.compare(
          credentials.password,
          user.passwordHash
        );

        if (!valid) {
          // Increment failed attempts
          const failedAttempts = user.failedAttempts + 1;
          const lockedUntil =
            failedAttempts >= 5
              ? new Date(Date.now() + 15 * 60 * 1000)
              : null;

          await prisma.user.update({
            where: { id: user.id },
            data: { failedAttempts, lockedUntil },
          });

          throw new Error("Invalid credentials");
        }

        // Reset failed attempts on success
        await prisma.user.update({
          where: { id: user.id },
          data: {
            failedAttempts: 0,
            lockedUntil: null,
            lastLoginAt: new Date(),
          },
        });

        return {
          id: user.id,
          email: user.email,
          name: user.name ?? user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as { id: string }).id;
        token.role = (user as { role: string }).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string }).id = token.id as string;
        (session.user as { role?: string }).role = token.role as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};