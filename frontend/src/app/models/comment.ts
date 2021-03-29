export interface Comment {
    commentId: string;
    targetId: string;
    content: string;
    commentedBy: string;
    ipAddress: string;
    timeEdited: Date;
    timeDeleted: Date;
    replies: Comment[];
}