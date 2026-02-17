import { ArticleForm } from "@/components/article-form";
import Link from "next/link";

export default function NewArticlePage() {
    return (
        <div>
            <div className="mb-6">
                <Link
                    href="/dashboard"
                    className="mb-2 inline-flex items-center gap-1.5 text-sm no-underline transition-colors duration-150"
                    style={{ color: "var(--text-muted)" }}
                >
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                    Back to Articles
                </Link>
                <h1
                    className="text-2xl font-semibold"
                    style={{ color: "var(--text-primary)" }}
                >
                    New Article
                </h1>
                <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>
                    Create a new article for your blog.
                </p>
            </div>
            <ArticleForm />
        </div>
    );
}
