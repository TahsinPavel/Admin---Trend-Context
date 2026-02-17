import { getArticleById } from "@/lib/queries";
import { ArticleForm } from "@/components/article-form";
import { notFound } from "next/navigation";
import Link from "next/link";

interface EditArticlePageProps {
    params: Promise<{ id: string }>;
}

export default async function EditArticlePage({ params }: EditArticlePageProps) {
    const { id } = await params;
    const articleId = Number(id);

    if (isNaN(articleId)) {
        notFound();
    }

    const article = await getArticleById(articleId);

    if (!article) {
        notFound();
    }

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
                    Edit Article
                </h1>
                <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>
                    Update &ldquo;{article.title}&rdquo;
                </p>
            </div>
            <ArticleForm article={article} />
        </div>
    );
}
