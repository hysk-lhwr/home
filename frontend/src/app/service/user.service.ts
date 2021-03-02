import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { LoginRequest } from "../models/log-in-request";
import { Role } from "../models/role";
import { User } from "../models/user";
import { LogInService } from "./log-in-service";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private user: User = {
        username: 'visitor',
        email: '',
        role: Role.VISITOR,
        timeLoggedin: null
    };

    private userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(this.user);
    public user$: Observable<User> = this.userSubject.asObservable();

    constructor(private service: LogInService, private router: Router) {}

    validateLogin(request: LoginRequest): void {
        // call login service
        this.service.login(request).pipe(
            switchMap(response => {
                if(!!response.valid) {
                    var user: User;
                    user.email = response.email;
                    user.role = response.role;
                    user.username = response.username;
                    user.timeLoggedin = new Date();
                    return of(user);
                } else {
                    return of(null);
                }
            })
        ).subscribe(
            result => {
                if(result) {
                    this.updateUser(result);
                } else {
                    // notifies failure
                }
                this.router.navigateByUrl('/');
            }
        );
    }

    getUser(): User {
        return this.user;
    }

    private updateUser(user: User): void {
        this.user = user;
        this.userSubject.next(this.user);
    }
}