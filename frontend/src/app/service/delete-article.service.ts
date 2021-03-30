import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BinaryResponse } from "../models/binary-response";
import { EnvironmentService } from "./environment.service";

@Injectable({
    providedIn: 'root'
})
export class DeleteArticleService {

    constructor(
        private http: HttpClient, 
        private environmentService: EnvironmentService
    ) {}

    deleteArticle(articleId: string):Observable<BinaryResponse> {
        const fullUrl = this.environmentService.backendUrl + 'articles/' + articleId;
        return this.http.delete<BinaryResponse>(fullUrl);
    }
}
