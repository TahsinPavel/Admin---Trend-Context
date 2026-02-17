import type { Metadata } from "next";
import "./globals.css";
import { isAuthenticated } from "@/lib/auth";
import { Sidebar } from "@/components/sidebar";

export const metadata: Metadata = {
  title: "TrendContext Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = await isAuthenticated();

  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased">
        {authed ? (
          <div className="flex min-h-screen">
            <Sidebar />
            <main
              className="flex-1 px-8 py-8"
              style={{ marginLeft: "var(--sidebar-width)" }}
            >
              <div className="mx-auto max-w-5xl">{children}</div>
            </main>
          </div>
        ) : (
          <main>{children}</main>
        )}
      </body>
    </html>
  );
}
