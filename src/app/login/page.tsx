import { LoginForm } from "./login-form";
import { isAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
    const authed = await isAuthenticated();
    if (authed) {
        redirect("/dashboard");
    }

    return (
        <div
            className="flex min-h-screen items-center justify-center px-4"
            style={{ background: "var(--bg-base)" }}
        >
            <div className="w-full max-w-sm">
                <div className="card p-8 shadow-sm">
                    <div className="mb-8 text-center">
                        <div
                            className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                            style={{ background: "var(--accent)" }}
                        >
                            <span className="text-base font-bold text-white">TC</span>
                        </div>
                        <h1
                            className="text-xl font-semibold"
                            style={{ color: "var(--text-primary)" }}
                        >
                            Welcome back
                        </h1>
                        <p
                            className="mt-1.5 text-sm"
                            style={{ color: "var(--text-secondary)" }}
                        >
                            Sign in to TrendContext Admin
                        </p>
                    </div>
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}
