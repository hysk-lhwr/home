import { Role } from "./role";

export interface LogInResponse {
    valid: boolean;
    username: string;
    email: string;
    role: Role;
}