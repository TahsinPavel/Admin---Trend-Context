import { isAuthenticated } from "@/lib/auth";
import { LogoutButton } from "./logout-button";
import Link from "next/link";

export async function Header() {
    const authed = await isAuthenticated();

    return (
        <header
            className="sticky top-0 z-50 border-b backdrop-blur-xl"
            style={{
                background: "rgba(17, 17, 24, 0.8)",
                borderColor: "var(--border)",
            }}
        >
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
                <Link href="/dashboard" className="flex items-center gap-3 no-underline">
                    <div
                        className="flex h-8 w-8 items-center justify-center rounded-lg"
                        style={{
                            background: "linear-gradient(135deg, var(--accent), #4f46e5)",
                            boxShadow: "0 0 16px var(--accent-glow)",
                        }}
                    >
                        <span className="text-sm font-bold text-white">TC</span>
                    </div>
                    <span
                        className="text-base font-semibold"
                        style={{ color: "var(--text-primary)" }}
                    >
                        TrendContext
                        <span
                            className="ml-1.5 text-xs font-normal"
                            style={{ color: "var(--text-muted)" }}
                        >
                            Admin
                        </span>
                    </span>
                </Link>
                {authed && <LogoutButton />}
            </div>
        </header>
    );
}
