import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SearchStringService {
    private searchStringSubject: Subject<string> = new Subject<string>();
    public searchString$ = this.searchStringSubject.asObservable();

    public updateSearchString(searchString: string) {
        this.searchStringSubject.next(searchString);
    }
}