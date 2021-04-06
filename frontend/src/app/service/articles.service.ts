import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { EnvironmentService } from "./environment.service";
import { Observable } from "rxjs";
import { ArticlesResponse } from "../models/articles-response";
import { Params } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class ArticlesService {

    constructor(private http: HttpClient, private environmentService: EnvironmentService) {}

    getArticles(params: Params): Observable<ArticlesResponse> {
        params = Object.assign({}, params, {username: 'rukbat'});
        const fullUrl = this.environmentService.backendUrl + 'articles';
        return this.http.get<ArticlesResponse>(fullUrl, {params: params});
    }

    searchArticles(params: Params): Observable<ArticlesResponse> {
        params = Object.assign({}, params, {username: 'rukbat'});
        const fullUrl = this.environmentService.backendUrl + 'searchArticles';
        return this.http.get<ArticlesResponse>(fullUrl, {params: params});
    }
}