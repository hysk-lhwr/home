import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { NewArticleRequest } from "../models/new-article-request";
import { NewArticleResponse } from "../models/new-article-response";
import { EnvironmentService } from "./environment.service";

@Injectable({
    providedIn: 'root'
})
export class NewArticleService {

    constructor(
        private http: HttpClient, 
        private environmentService: EnvironmentService
    ) {}

    createArticle(request: NewArticleRequest):Observable<NewArticleResponse> {
        const fullUrl = this.environmentService.backendUrl + 'articles/new';
        return this.http.post<NewArticleResponse>(fullUrl, request);
    }
}