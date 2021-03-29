import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

export class IpResp {
    ip: string;
}

@Injectable({
    providedIn: 'root'
})
export class IpService {
    private clientIp: string = null;
    private clientIpSub: BehaviorSubject<string> = new BehaviorSubject(this.clientIp);
    clientIp$ = this.clientIpSub.asObservable();

    constructor(private http: HttpClient) {
        this.refreshClientIp();
    }

    private refreshClientIp(): void {
        this.http.get<IpResp>('http://api.ipify.org/?format=json').subscribe(
            resp => {
                this.clientIp = resp.ip;
                this.clientIpSub.next(this.clientIp);
            }
        )
    }
}
