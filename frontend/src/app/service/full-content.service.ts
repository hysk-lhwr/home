import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FullContent } from "../models/full-content";
import { EnvironmentService } from "./environment.service";

@Injectable({
    providedIn: 'root'
})
export class FullContentService {

    constructor(
        private http: HttpClient, 
        private environmentService: EnvironmentService
    ) {}

    getFullContent(articleId: string):Observable<FullContent> {
        const fullUrl = this.environmentService.backendUrl + 'articles/' + encodeURI(articleId);
        return this.http.get<FullContent>(fullUrl);
    }
}