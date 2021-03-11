import { Status } from "./status";

export interface ShortenedArticle {
    articleId: string;
    articleTitle: string;
    preview: string;
    keywords: string[];
    categories: string[];
    status: Status;
}
