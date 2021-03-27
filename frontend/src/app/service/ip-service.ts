import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export class IpResp {
    ip: string;
}

@Injectable({
    providedIn: 'root'
})
export class IpService {

    constructor(private http: HttpClient) {
    }

    public getClientIp(): Observable<IpResp> {
        return this.http.get<IpResp>('http://api.ipify.org/?format=json');
    }
}
