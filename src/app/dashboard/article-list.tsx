"use client";

import Link from "next/link";
import { deleteArticleAction } from "@/app/actions";
import type { Article } from "@/lib/types";
import { useState } from "react";

export function ArticleList({ articles }: { articles: Article[] }) {
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [modalArticle, setModalArticle] = useState<Article | null>(null);

    async function handleDelete() {
        if (!modalArticle) return;
        setDeletingId(modalArticle.id);
        setModalArticle(null);
        await deleteArticleAction(modalArticle.id);
        setDeletingId(null);
    }

    return (
        <>
            <div className="card overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr style={{ borderBottom: "1px solid var(--border)" }}>
                            <th
                                className="px-5 py-3 text-xs font-medium uppercase tracking-wider"
                                style={{ color: "var(--text-secondary)" }}
                            >
                                Title
                            </th>
                            <th
                                className="px-5 py-3 text-xs font-medium uppercase tracking-wider"
                                style={{ color: "var(--text-secondary)" }}
                            >
                                Status
                            </th>
                            <th
                                className="px-5 py-3 text-xs font-medium uppercase tracking-wider"
                                style={{ color: "var(--text-secondary)" }}
                            >
                                Date
                            </th>
                            <th
                                className="px-5 py-3 text-right text-xs font-medium uppercase tracking-wider"
                                style={{ color: "var(--text-secondary)" }}
                            >
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {articles.map((article, index) => (
                            <tr
                                key={article.id}
                                className="transition-colors duration-150"
                                style={{
                                    borderBottom:
                                        index < articles.length - 1
                                            ? "1px solid var(--border)"
                                            : undefined,
                                    background: index % 2 === 1 ? "var(--bg-zebra)" : "transparent",
                                }}
                                onMouseEnter={(e) =>
                                    (e.currentTarget.style.background = "var(--bg-hover)")
                                }
                                onMouseLeave={(e) =>
                                (e.currentTarget.style.background =
                                    index % 2 === 1 ? "var(--bg-zebra)" : "transparent")
                                }
                            >
                                <td className="px-5 py-3.5">
                                    <span
                                        className="font-medium"
                                        style={{ color: "var(--text-primary)" }}
                                    >
                                        {article.title}
                                    </span>
                                </td>
                                <td className="px-5 py-3.5">
                                    {article.status === "published" ? (
                                        <span className="badge-published">
                                            <span
                                                className="h-1.5 w-1.5 rounded-full"
                                                style={{ background: "var(--success)" }}
                                            />
                                            Published
                                        </span>
                                    ) : (
                                        <span className="badge-draft">
                                            <span
                                                className="h-1.5 w-1.5 rounded-full"
                                                style={{ background: "var(--text-muted)" }}
                                            />
                                            Draft
                                        </span>
                                    )}
                                </td>
                                <td
                                    className="px-5 py-3.5 text-xs"
                                    style={{ color: "var(--text-secondary)" }}
                                >
                                    {article.published_at
                                        ? new Date(article.published_at).toLocaleDateString(
                                            "en-US",
                                            {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            }
                                        )
                                        : "—"}
                                </td>
                                <td className="px-5 py-3.5 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link
                                            href={`/edit/${article.id}`}
                                            className="text-sm font-medium no-underline transition-colors duration-150"
                                            style={{ color: "var(--accent)" }}
                                            onMouseEnter={(e) =>
                                            (e.currentTarget.style.color =
                                                "var(--accent-hover)")
                                            }
                                            onMouseLeave={(e) =>
                                                (e.currentTarget.style.color = "var(--accent)")
                                            }
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => setModalArticle(article)}
                                            disabled={deletingId === article.id}
                                            className="rounded-md p-1.5 transition-colors duration-150 disabled:opacity-50"
                                            style={{
                                                color: "var(--text-muted)",
                                                background: "transparent",
                                                border: "none",
                                                cursor: "pointer",
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.color = "var(--destructive)";
                                                e.currentTarget.style.background =
                                                    "var(--destructive-muted)";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.color = "var(--text-muted)";
                                                e.currentTarget.style.background = "transparent";
                                            }}
                                            title="Delete"
                                        >
                                            {deletingId === article.id ? (
                                                <span className="text-xs">…</span>
                                            ) : (
                                                <svg
                                                    className="h-4 w-4"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                                    />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Delete Confirmation Modal */}
            {modalArticle && (
                <div className="modal-overlay" onClick={() => setModalArticle(null)}>
                    <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                        <div className="mb-4 flex items-start gap-3">
                            <div
                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                                style={{ background: "var(--destructive-muted)" }}
                            >
                                <svg
                                    className="h-5 w-5"
                                    style={{ color: "var(--destructive)" }}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h3
                                    className="text-base font-semibold"
                                    style={{ color: "var(--text-primary)" }}
                                >
                                    Delete article
                                </h3>
                                <p
                                    className="mt-1 text-sm"
                                    style={{ color: "var(--text-secondary)" }}
                                >
                                    Are you sure you want to delete &ldquo;{modalArticle.title}&rdquo;?
                                    This action cannot be undone.
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setModalArticle(null)}
                                className="btn-secondary"
                            >
                                Cancel
                            </button>
                            <button onClick={handleDelete} className="btn-danger">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
