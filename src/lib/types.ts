export interface Article {
    id: number;
    title: string;
    slug: string;
    description: string;
    content: string;
    published_at: string | null;
    status: string;
    author: string;
    created_at: string;
    updated_at: string;
}

export interface ArticleFormData {
    title: string;
    slug: string;
    description: string;
    content: string;
    status: string;
    published_at: string | null;
}
