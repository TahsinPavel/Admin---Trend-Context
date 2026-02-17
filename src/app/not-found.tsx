export default function NotFound() {
    return (
        <div className="flex min-h-[60vh] items-center justify-center">
            <div className="text-center">
                <h1
                    className="text-6xl font-bold"
                    style={{ color: "var(--accent)" }}
                >
                    404
                </h1>
                <p
                    className="mt-3 text-lg font-medium"
                    style={{ color: "var(--text-primary)" }}
                >
                    Page not found
                </p>
                <p
                    className="mt-1 text-sm"
                    style={{ color: "var(--text-secondary)" }}
                >
                    The page you&apos;re looking for doesn&apos;t exist.
                </p>
                <div className="mt-6">
                    <a href="/dashboard" className="btn-primary">
                        Back to Dashboard
                    </a>
                </div>
            </div>
        </div>
    );
}
