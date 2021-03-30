export interface BinaryFeedbackRequest {
    username: string;
    ip: string;
    score: 1 | -1;
}
