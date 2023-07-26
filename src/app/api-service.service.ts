import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

let auth_token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImEzYmRiZmRlZGUzYmFiYjI2NTFhZmNhMjY3OGRkZThjMGIzNWRmNzYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA3MzY2NzE1NzQ3MDAwNDA2OTQ0IiwiaGQiOiJwZXJzaXN0ZW50LmNvbSIsImVtYWlsIjoia2FyYW5fY2hlbGxhbmlAcGVyc2lzdGVudC5jb20iLCJlbWFpbF92ZXJpZmllZ';
const httpOptions = {
  headers: new HttpHeaders({ 
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  "Access-Control-Allow-Methods": "POST",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Max-Age": "3600",
  'Authorization': `Bearer ${auth_token}`
 })
};
const token = localStorage.getItem('token')
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  
  constructor(private http: HttpClient) { }
  private apiUrl = 'https://anshulganvir.tk/api/';
  
  initializeApp(){
    const postData = {"username":"tenant@thingsboard.org", "password":"tenant"};
    const headers =  new HttpHeaders({'Access-Control-Allow-Origin': '*','content-type': 'application/json', 'Accept': 'application/json'} )
    return this.http.post(this.apiUrl + 'auth/login', postData, {'headers': headers});
  }

  public getDeviceList(){
    return this.http.get<any>('');
  }

  public getDeviceId(data:any): Observable<any> {
    const headers =  new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'content-type': 'application/json', 
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<any>(this.apiUrl+'tenant/devices?deviceName='+data, {'headers': headers});
  }

  public getParameterList(deviceId: any): Observable<any> {
    const headers =  new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'content-type': 'application/json', 
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<any>(this.apiUrl+'plugins/telemetry/DEVICE/'+deviceId+'/keys/attributes', {'headers': headers});
  }

  public fetchCurrentData(deviceId:any, paramter: any): Observable<any> {
    const headers =  new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'content-type': 'application/json', 
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<any>(this.apiUrl + 'plugins/telemetry/DEVICE/'+deviceId+'/values/attributes?keys='+ paramter, {'headers': headers});
  }
  
  fetchPreviousData(postData: any){   
    let url = 'https://asia-south1-snmp-poc-indus.cloudfunctions.net/indus_BQ';
    return this.http.post(url, postData, httpOptions)
  }

  setRule(postData: any){
    let url = 'https://asia-south1-snmp-poc-indus.cloudfunctions.net/Indus_device_rules';
    return this.http.post(url, postData, httpOptions)
  }
}
