import { Role } from "./role";

export interface User {
    username: string;
    email: string;
    role: Role;
    timeLoggedin: Date;
}