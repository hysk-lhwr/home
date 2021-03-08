import { Status } from "./status";

export interface UpdateArticleRequest {
    articleId: string;
    udpatedBy: string;
    title: string;
    keywords: string[];
    categories: string[];
    preview: string;
    contentRaw: string;
    contentHtml: string;
    contentMarkdown: string;
    status: Status;
}

export const updateArticleRequestDefault: UpdateArticleRequest = {
    articleId: '',
    udpatedBy: '',
    title: '',
    keywords: [],
    categories: [],
    preview: '',
    contentRaw: '',
    contentHtml: '',
    contentMarkdown: '',
    status: Status.DRAFT,
}