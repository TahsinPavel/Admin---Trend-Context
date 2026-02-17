import { cookies } from "next/headers";

const SESSION_COOKIE_NAME = "admin_session";
const SESSION_VALUE = "authenticated";

export async function createSession(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, SESSION_VALUE, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24, // 24 hours
    });
}

export async function destroySession(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function isAuthenticated(): Promise<boolean> {
    const cookieStore = await cookies();
    const session = cookieStore.get(SESSION_COOKIE_NAME);
    return session?.value === SESSION_VALUE;
}

export function verifyPassword(password: string): boolean {
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
        throw new Error("ADMIN_PASSWORD environment variable is not set");
    }
    return password === adminPassword;
}
