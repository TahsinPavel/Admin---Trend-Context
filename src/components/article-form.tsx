"use client";

import { useActionState, useState, useEffect, useCallback } from "react";
import { createArticleAction, updateArticleAction, deleteArticleAction } from "@/app/actions";
import { RichTextEditor } from "@/components/rich-text-editor";
import type { Article } from "@/lib/types";
import Link from "next/link";

interface ArticleFormProps {
    article?: Article;
}

function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

export function ArticleForm({ article }: ArticleFormProps) {
    const isEditing = !!article;
    const action = isEditing ? updateArticleAction : createArticleAction;
    const [state, formAction, isPending] = useActionState(action, null);

    const [title, setTitle] = useState(article?.title ?? "");
    const [slug, setSlug] = useState(article?.slug ?? "");
    const [slugManuallyEdited, setSlugManuallyEdited] = useState(isEditing);
    const [description, setDescription] = useState(article?.description ?? "");
    const [contentHtml, setContentHtml] = useState(article?.content ?? "");
    const [published, setPublished] = useState(article?.status === "published");
    const [publishedAt, setPublishedAt] = useState(
        article?.published_at
            ? new Date(article.published_at).toISOString().slice(0, 16)
            : ""
    );
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (!slugManuallyEdited) {
            setSlug(slugify(title));
        }
    }, [title, slugManuallyEdited]);

    const handleSlugChange = useCallback((value: string) => {
        setSlug(value);
        setSlugManuallyEdited(true);
    }, []);

    async function handleDelete() {
        if (!article) return;
        setIsDeleting(true);
        await deleteArticleAction(article.id);
        setIsDeleting(false);
    }

    return (
        <form action={formAction}>
            {isEditing && <input type="hidden" name="id" value={article.id} />}
            <input type="hidden" name="content_html" value={contentHtml} />
            <input type="hidden" name="published" value={String(published)} />

            {/* Error / Success Messages */}
            {state?.error && (
                <div
                    className="mb-6 rounded-lg px-4 py-3 text-sm font-medium"
                    style={{
                        background: "var(--destructive-muted)",
                        color: "var(--destructive)",
                        border: "1px solid rgba(220, 38, 38, 0.15)",
                    }}
                >
                    {state.error}
                </div>
            )}
            {state?.success && (
                <div
                    className="mb-6 rounded-lg px-4 py-3 text-sm font-medium"
                    style={{
                        background: "var(--success-muted)",
                        color: "var(--success)",
                        border: "1px solid rgba(22, 163, 74, 0.15)",
                    }}
                >
                    {state.success}
                </div>
            )}

            {/* Two-column layout */}
            <div className="flex flex-col gap-6 lg:flex-row">
                {/* Left Column — Editor (70%) */}
                <div className="flex-1 lg:w-[70%] space-y-5">
                    {/* Title */}
                    <div className="card p-6">
                        <input
                            id="title"
                            name="title"
                            type="text"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Article title"
                            className="w-full border-none bg-transparent text-2xl font-semibold outline-none placeholder:text-gray-300"
                            style={{ color: "var(--text-primary)" }}
                        />
                        <div className="mt-3 flex items-center gap-1.5">
                            <span className="text-xs" style={{ color: "var(--text-muted)" }}>/</span>
                            <input
                                id="slug"
                                name="slug"
                                type="text"
                                required
                                value={slug}
                                onChange={(e) => handleSlugChange(e.target.value)}
                                placeholder="article-slug"
                                className="w-full border-none bg-transparent text-xs outline-none placeholder:text-gray-300"
                                style={{ color: "var(--text-secondary)" }}
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="card p-6">
                        <label
                            htmlFor="description"
                            className="mb-2 block text-xs font-medium uppercase tracking-wider"
                            style={{ color: "var(--text-secondary)" }}
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Brief description of the article"
                            className="input-field resize-none"
                        />
                    </div>

                    {/* Rich Text Editor */}
                    <div>
                        <RichTextEditor content={contentHtml} onChange={setContentHtml} />
                    </div>
                </div>

                {/* Right Column — Publish Panel (30%) */}
                <div className="lg:w-[30%]">
                    <div className="card sticky top-20 space-y-5 p-5">
                        <h3
                            className="text-sm font-semibold"
                            style={{ color: "var(--text-primary)" }}
                        >
                            Publish
                        </h3>

                        {/* Status Toggle */}
                        <div className="flex items-center justify-between">
                            <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                                Status
                            </span>
                            <div className="flex items-center gap-2.5">
                                <button
                                    type="button"
                                    role="switch"
                                    aria-checked={published}
                                    onClick={() => setPublished(!published)}
                                    className="relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200"
                                    style={{
                                        background: published
                                            ? "var(--success)"
                                            : "var(--border)",
                                    }}
                                >
                                    <span
                                        className="pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200"
                                        style={{
                                            transform: published
                                                ? "translateX(1rem)"
                                                : "translateX(0)",
                                        }}
                                    />
                                </button>
                                <span
                                    className="text-xs font-medium"
                                    style={{
                                        color: published
                                            ? "var(--success)"
                                            : "var(--text-secondary)",
                                    }}
                                >
                                    {published ? "Published" : "Draft"}
                                </span>
                            </div>
                        </div>

                        {/* Publish Date */}
                        <div>
                            <label
                                htmlFor="published_at"
                                className="mb-1.5 block text-sm"
                                style={{ color: "var(--text-secondary)" }}
                            >
                                Publish date
                            </label>
                            <input
                                id="published_at"
                                name="published_at"
                                type="datetime-local"
                                value={publishedAt}
                                onChange={(e) => setPublishedAt(e.target.value)}
                                className="input-field text-sm"
                            />
                        </div>

                        {/* Save button */}
                        <button
                            type="submit"
                            disabled={isPending}
                            className="btn-primary w-full py-2.5"
                        >
                            {isPending
                                ? "Saving…"
                                : isEditing
                                    ? "Update Article"
                                    : "Create Article"}
                        </button>

                        {/* Cancel */}
                        <Link
                            href="/dashboard"
                            className="btn-secondary block w-full text-center"
                        >
                            Cancel
                        </Link>

                        {/* Delete (only when editing) */}
                        {isEditing && (
                            <>
                                <div
                                    className="border-t pt-4"
                                    style={{ borderColor: "var(--border)" }}
                                >
                                    <button
                                        type="button"
                                        onClick={() => setShowDeleteModal(true)}
                                        disabled={isDeleting}
                                        className="btn-danger w-full"
                                    >
                                        {isDeleting ? "Deleting…" : "Delete Article"}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
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
                                    Are you sure you want to delete this article? This action cannot
                                    be undone.
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => setShowDeleteModal(false)}
                                className="btn-secondary"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="btn-danger"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </form>
    );
}
