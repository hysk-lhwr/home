import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginRequest } from "../models/log-in-request";
import { LogInResponse } from "../models/log-in-response";
import { EnvironmentService } from "./environment.service";

@Injectable({
    providedIn: 'root'
})
export class LogInService {

    private url = 'login';

    constructor(private http: HttpClient, private environmentService: EnvironmentService) {}

    login(request: LoginRequest): Observable<LogInResponse> {
        const fullUrl = this.environmentService.backendUrl + this.url;
        return this.http.get<LogInResponse>(fullUrl);
    }
}