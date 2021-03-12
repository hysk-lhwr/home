import { Status } from "./status";

export interface FullContent {
    title: string;
    createdDate: Date;
    editedDate: Date;
    contentRaw: string;
    contentMarkdown: string;
    contentHtml: string;
    views: number;
    likes: number;
    categories: string[];
    keywords: string[];
    preview: string;
    status: Status;
}
