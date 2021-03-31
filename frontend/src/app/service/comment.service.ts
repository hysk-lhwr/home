import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Params } from "@angular/router";
import { Observable } from "rxjs";
import { CommentRequest } from "../models/comment-request";
import { GetCommentsReponse } from "../models/get-comments-response";
import { EnvironmentService } from "./environment.service";

@Injectable({
    providedIn: 'root'
})
export class CommentService {

    constructor(private http: HttpClient, private environmentService: EnvironmentService) {}

    public createComment(request: CommentRequest): Observable<string> {
        const fullUrl = this.environmentService.backendUrl + 'comments/new';
        return this.http.post<string>(fullUrl, request);
    }

    public getComments(params: Params): Observable<GetCommentsReponse> {
        const fullUrl = this.environmentService.backendUrl + 'comments';
        return this.http.get<GetCommentsReponse>(fullUrl, {params: params})
    }
}