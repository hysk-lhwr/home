import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Error } from "../models/error-handling/error";

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

    public resolveError(): void {
        this.error = null;
        this.broadcastError();
    }

    private broadcastError(): void {
        this.errorSubject.next(this.error);
    }
}