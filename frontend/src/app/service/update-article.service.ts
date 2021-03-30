import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BinaryResponse } from "../models/binary-response";
import { UpdateArticleRequest } from "../models/update-article-request";
import { EnvironmentService } from "./environment.service";

@Injectable({
    providedIn: 'root'
})
export class UpdateArticleService {

    constructor(
        private http: HttpClient, 
        private environmentService: EnvironmentService
    ) {}

    updateArticle(request: UpdateArticleRequest):Observable<BinaryResponse> {
        const fullUrl = this.environmentService.backendUrl + 'articles/edit';
        return this.http.post<BinaryResponse>(fullUrl, request);
    }
}