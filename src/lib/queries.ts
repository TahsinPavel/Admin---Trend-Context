import { getDB } from "./db";
import type { Article, ArticleFormData } from "./types";

export async function getAllArticles(): Promise<Article[]> {
  const sql = getDB();
  const rows = await sql`
    SELECT id, title, slug, description, content, published_at, status, author, created_at, updated_at
    FROM articles
    ORDER BY created_at DESC
  `;
  return rows as Article[];
}

export async function getArticleById(id: number): Promise<Article | null> {
  const sql = getDB();
  const rows = await sql`
    SELECT id, title, slug, description, content, published_at, status, author, created_at, updated_at
    FROM articles
    WHERE id = ${id}
  `;
  if (rows.length === 0) return null;
  return rows[0] as Article;
}

export async function createArticle(data: ArticleFormData): Promise<Article> {
  const sql = getDB();
  const rows = await sql`
    INSERT INTO articles (title, slug, description, content, status, published_at)
    VALUES (${data.title}, ${data.slug}, ${data.description}, ${data.content}, ${data.status}, ${data.published_at})
    RETURNING id, title, slug, description, content, published_at, status, author, created_at, updated_at
  `;
  return rows[0] as Article;
}

export async function updateArticle(id: number, data: ArticleFormData): Promise<Article> {
  const sql = getDB();
  const rows = await sql`
    UPDATE articles
    SET title = ${data.title},
        slug = ${data.slug},
        description = ${data.description},
        content = ${data.content},
        status = ${data.status},
        published_at = ${data.published_at},
        updated_at = NOW()
    WHERE id = ${id}
    RETURNING id, title, slug, description, content, published_at, status, author, created_at, updated_at
  `;
  return rows[0] as Article;
}

export async function deleteArticle(id: number): Promise<void> {
  const sql = getDB();
  await sql`DELETE FROM articles WHERE id = ${id}`;
}
