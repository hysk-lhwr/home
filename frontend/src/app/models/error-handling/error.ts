import { ActionType } from "./action-type";
import { ErrorType } from "./error-type"

export interface Error {
    type: ErrorType;
    message: string;
    action: ActionType;
    actionMessage: string;
}
