import { Injectable } from "@angular/core";
import { Environment } from "src/environments/environment-interface";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class EnvironmentService implements Environment {
    constructor() {}

    get production() {
        return environment.production;
    }

    get apiUrl() {
        return environment.apiUrl;
    }
}