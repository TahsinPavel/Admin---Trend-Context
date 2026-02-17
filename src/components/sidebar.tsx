"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutButton } from "./logout-button";

const NAV_ITEMS = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: (
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z" />
            </svg>
        ),
    },
    {
        label: "New Article",
        href: "/new",
        icon: (
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
        ),
    },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 flex h-full flex-col border-r bg-white"
            style={{
                width: "var(--sidebar-width)",
                borderColor: "var(--border)",
            }}
        >
            {/* Logo */}
            <div className="flex items-center gap-2.5 px-5 py-5">
                <div
                    className="flex h-8 w-8 items-center justify-center rounded-lg"
                    style={{ background: "var(--accent)" }}
                >
                    <span className="text-xs font-bold text-white">TC</span>
                </div>
                <div>
                    <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                        TrendContext
                    </span>
                    <span className="ml-1 text-xs font-normal" style={{ color: "var(--text-muted)" }}>
                        Admin
                    </span>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 space-y-0.5 px-3 pt-2">
                {NAV_ITEMS.map((item) => {
                    const isActive =
                        pathname === item.href ||
                        (item.href === "/dashboard" && pathname === "/");

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium no-underline transition-colors duration-150"
                            style={{
                                color: isActive ? "var(--accent)" : "var(--text-secondary)",
                                background: isActive ? "var(--accent-muted)" : "transparent",
                            }}
                            onMouseEnter={(e) => {
                                if (!isActive) {
                                    e.currentTarget.style.background = "var(--bg-hover)";
                                    e.currentTarget.style.color = "var(--text-primary)";
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isActive) {
                                    e.currentTarget.style.background = "transparent";
                                    e.currentTarget.style.color = "var(--text-secondary)";
                                }
                            }}
                        >
                            {item.icon}
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Logout at bottom */}
            <div className="border-t px-3 py-3" style={{ borderColor: "var(--border)" }}>
                <LogoutButton />
            </div>
        </aside>
    );
}
