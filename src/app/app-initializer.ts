import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class AppInitializer {
    constructor(private httpClient: HttpClient){}

    initializeApp(): Promise<any>{
        const apiUrl = "http://35.200.254.232:8080/api/auth/login";
        const postData = {"username":"tenant@thingsboard.org", "password":""};
        const headers =  new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
        return this.httpClient.post(apiUrl, postData, {headers}).toPromise();
    }
}

export function appInitializer(appInitializer: AppInitializer) {
    return (): Promise<any> => appInitializer.initializeApp();
}