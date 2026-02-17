import { getAllArticles } from "@/lib/queries";
import { ArticleList } from "./article-list";
import Link from "next/link";

export default async function DashboardPage() {
    const articles = await getAllArticles();

    const publishedCount = articles.filter((a) => a.status === "published").length;
    const draftCount = articles.filter((a) => a.status !== "published").length;

    return (
        <div>
            {/* Sticky top bar */}
            <div className="sticky top-0 z-10 -mx-8 mb-6 border-b px-8 py-4"
                style={{
                    background: "var(--bg-base)",
                    borderColor: "var(--border)",
                }}
            >
                <div className="mx-auto flex max-w-5xl items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold" style={{ color: "var(--text-primary)" }}>
                            Articles
                        </h1>
                        <p className="mt-0.5 text-xs" style={{ color: "var(--text-secondary)" }}>
                            Manage your blog content
                        </p>
                    </div>
                    <Link href="/new" className="btn-primary">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        New Article
                    </Link>
                </div>
            </div>

            {/* Stats */}
            <div className="mb-6 grid grid-cols-3 gap-4">
                <div className="card px-5 py-4">
                    <p className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
                        Total
                    </p>
                    <p className="mt-1 text-2xl font-semibold" style={{ color: "var(--text-primary)" }}>
                        {articles.length}
                    </p>
                </div>
                <div className="card px-5 py-4">
                    <p className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
                        Published
                    </p>
                    <p className="mt-1 text-2xl font-semibold" style={{ color: "var(--success)" }}>
                        {publishedCount}
                    </p>
                </div>
                <div className="card px-5 py-4">
                    <p className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
                        Drafts
                    </p>
                    <p className="mt-1 text-2xl font-semibold" style={{ color: "var(--text-secondary)" }}>
                        {draftCount}
                    </p>
                </div>
            </div>

            {/* Article List or Empty State */}
            {articles.length === 0 ? (
                <div className="card py-20 text-center">
                    <div
                        className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl"
                        style={{ background: "var(--bg-hover)" }}
                    >
                        <svg
                            className="h-6 w-6"
                            style={{ color: "var(--text-muted)" }}
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                            />
                        </svg>
                    </div>
                    <h3 className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                        No articles yet
                    </h3>
                    <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>
                        Get started by creating your first article.
                    </p>
                    <div className="mt-5">
                        <Link href="/new" className="btn-primary">
                            Create Article
                        </Link>
                    </div>
                </div>
            ) : (
                <ArticleList articles={articles} />
            )}
        </div>
    );
}
