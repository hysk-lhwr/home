import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { EnvironmentService } from "./environment.service";
import { Observable } from "rxjs";
import { ArticlesResponse } from "../models/articles-response";

@Injectable({
    providedIn: 'root'
})
export class ArticlesService {

    private url = 'articles';

    constructor(private http: HttpClient, private environmentService: EnvironmentService) {}

    getArticles(): Observable<ArticlesResponse> {
        const fullUrl = this.environmentService.backendUrl + this.url;
        return this.http.get<ArticlesResponse>(fullUrl);
    }
}