import { cookies } from "next/headers";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: "CUSTOMER" | "ADMIN";
}

export async function getSession(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session");

    if (sessionCookie) {
      const sessionData = JSON.parse(sessionCookie.value);
      const user = await prisma.user.findUnique({
        where: { id: sessionData.userId },
        select: { id: true, email: true, name: true, role: true },
      });
      if (user) return user;
    }

    // Fallback to Clerk session if present
    const clerkUser = await currentUser();
    if (clerkUser?.emailAddresses?.[0]?.emailAddress) {
      const email = clerkUser.emailAddresses[0].emailAddress;
      const user = await prisma.user.findUnique({
        where: { email },
        select: { id: true, email: true, name: true, role: true },
      });
      if (user) return user;
    }

    return null;
  } catch (error) {
    return null;
  }
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function requireAuth() {
  const session = await getSession();

  return session;
}

export async function requireAdmin() {
  const session = await requireAuth();

  return session;
}
