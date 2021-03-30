import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { ActionType } from "../models/error-handling/action-type";
import { Error } from "../models/error-handling/error";
import { ErrorType } from "../models/error-handling/error-type";

@Injectable({
    providedIn: 'root'
})
export class ErrorNotificationService {
    private error: Error = null;
    private errorSubject: BehaviorSubject<Error> = new BehaviorSubject(this.error);
    error$ = this.errorSubject.asObservable();

    public newError(err: Error): void {
        this.error = err;
        this.broadcastError();
    }

    private broadcastError(): void {
        this.errorSubject.next(this.error);
    }
}