import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { LoginRequest } from "../models/log-in-request";
import { LogInResponse } from "../models/log-in-response";
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

    constructor(private service: LogInService, private router: Router) {
        if(localStorage.getItem('user')) {
            this.user = JSON.parse(localStorage.getItem('user')) as User;
            this.publishUser();
        }
    }

    validateLogin(request: LoginRequest): void {
        // call login service
        this.service.login(request).pipe(
            switchMap(response => {
                if(!!response.valid) {
                    this.updateUser(response)
                    return of(true);
                } else {
                    return of(false);
                }
            })
        ).subscribe(
            result => {
                if(!result) {
                    // notifies failure
                }
                this.router.navigateByUrl('/');
            }
        );
    }

    logout() {
        const defaultUser: User = {
            username: 'visitor',
            email: '',
            role: Role.VISITOR,
            timeLoggedin: null
        };
        this.user = defaultUser;
        localStorage.setItem('user', JSON.stringify(defaultUser));
        this.publishUser();
    }

    getUser(): User {
        return this.user;
    }

    private updateUser(response: LogInResponse): void {
        this.user.email = response.email;
        this.user.role = response.role;
        this.user.username = response.username;
        this.user.timeLoggedin = new Date();
        
        localStorage.setItem('user', JSON.stringify(this.user));

        this.publishUser();
    }

    private publishUser(): void {
        this.userSubject.next(this.user);
    }
}