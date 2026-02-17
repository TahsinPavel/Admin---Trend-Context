"use client";

import { useActionState } from "react";
import { login } from "@/app/actions";

export function LoginForm() {
    const [state, formAction, isPending] = useActionState(login, null);

    return (
        <form action={formAction}>
            <div className="space-y-5">
                <div>
                    <label
                        htmlFor="password"
                        className="mb-2 block text-sm font-medium"
                        style={{ color: "var(--text-primary)" }}
                    >
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        autoFocus
                        placeholder="Enter admin password"
                        className="input-field"
                    />
                </div>

                {state?.error && (
                    <div
                        className="rounded-lg px-3 py-2.5 text-sm font-medium"
                        style={{
                            background: "var(--destructive-muted)",
                            color: "var(--destructive)",
                            border: "1px solid rgba(220, 38, 38, 0.15)",
                        }}
                    >
                        {state.error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isPending}
                    className="btn-primary w-full py-2.5"
                >
                    {isPending ? "Signing in…" : "Sign In"}
                </button>
            </div>
        </form>
    );
}
