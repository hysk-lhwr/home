import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { Node } from "../models/linkables/node";
import { LinkedList } from "../models/linkables/linked-list";

@Injectable({
    providedIn: 'root'
})
export class ArticlesLinkService {
    private articlesLink: LinkedList = new LinkedList();
    private articlesLinkSubject: BehaviorSubject<LinkedList> = new BehaviorSubject<LinkedList>(this.articlesLink);
    public articlesLink$: Observable<LinkedList> = this.articlesLinkSubject.asObservable();

    public append(articleNode: Node) {
        this.articlesLink.append(articleNode);
        this.articlesLinkSubject.next(this.articlesLink);
    }

    public resetLink() {
        this.articlesLink = new LinkedList();
        this.articlesLinkSubject.next(this.articlesLink);
    }
}