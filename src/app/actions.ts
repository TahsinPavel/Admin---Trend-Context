"use server";

import { redirect } from "next/navigation";
import { createSession, destroySession, verifyPassword } from "@/lib/auth";
import { createArticle, updateArticle, deleteArticle } from "@/lib/queries";
import type { ArticleFormData } from "@/lib/types";
import DOMPurify from "isomorphic-dompurify";

export async function login(
    _prevState: { error: string } | null,
    formData: FormData
): Promise<{ error: string } | null> {
    const password = formData.get("password") as string;

    if (!password) {
        return { error: "Password is required" };
    }

    if (!verifyPassword(password)) {
        return { error: "Invalid password" };
    }

    await createSession();
    redirect("/dashboard");
}

export async function logout(): Promise<void> {
    await destroySession();
    redirect("/login");
}

function sanitizeHtml(html: string): string {
    return DOMPurify.sanitize(html, {
        ALLOWED_TAGS: [
            "h1", "h2", "h3", "p", "br", "strong", "em", "u", "s",
            "ul", "ol", "li", "a", "blockquote",
        ],
        ALLOWED_ATTR: ["href", "target", "rel"],
    });
}

function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

function parseFormData(formData: FormData): ArticleFormData {
    const title = (formData.get("title") as string) || "";
    const rawSlug = (formData.get("slug") as string) || "";
    const slug = rawSlug ? slugify(rawSlug) : slugify(title);
    const description = (formData.get("description") as string) || "";
    const contentHtml = (formData.get("content_html") as string) || "";
    const status = formData.get("published") === "true" ? "published" : "draft";
    const publishedAt = formData.get("published_at") as string;

    return {
        title: title.trim(),
        slug,
        description: description.trim(),
        content: sanitizeHtml(contentHtml),
        status,
        published_at: publishedAt || null,
    };
}

export async function createArticleAction(
    _prevState: { error?: string; success?: string } | null,
    formData: FormData
): Promise<{ error?: string; success?: string }> {
    const data = parseFormData(formData);

    if (!data.title) {
        return { error: "Title is required" };
    }
    if (!data.slug) {
        return { error: "Slug is required" };
    }

    try {
        await createArticle(data);
    } catch (e) {
        const message = e instanceof Error ? e.message : "Failed to create article";
        return { error: message };
    }

    redirect("/dashboard");
}

export async function updateArticleAction(
    _prevState: { error?: string; success?: string } | null,
    formData: FormData
): Promise<{ error?: string; success?: string }> {
    const id = Number(formData.get("id"));
    if (!id) {
        return { error: "Invalid article ID" };
    }

    const data = parseFormData(formData);

    if (!data.title) {
        return { error: "Title is required" };
    }
    if (!data.slug) {
        return { error: "Slug is required" };
    }

    try {
        await updateArticle(id, data);
    } catch (e) {
        const message = e instanceof Error ? e.message : "Failed to update article";
        return { error: message };
    }

    redirect("/dashboard");
}

export async function deleteArticleAction(id: number): Promise<{ error?: string }> {
    try {
        await deleteArticle(id);
    } catch (e) {
        const message = e instanceof Error ? e.message : "Failed to delete article";
        return { error: message };
    }

    redirect("/dashboard");
}
