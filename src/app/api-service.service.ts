import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

let auth_token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZW5hbnRAdGhpbmdzYm9hcmQub3JnIiwidXNlcklkIjoiOWU1YzY1YTAtMDM3MC0xMWVlLTkwNTYtZTFjZDQwZDE3ZTk2Iiwic2NvcGVzIjpbIlRFTkFOVF9BRE1JTiJdLCJzZXNzaW9uSWQiOiIwOTk1OTVhNC05ZWE3LTQxOTYtYmI2OS01NzhkYTY2ZTkxZTYiLCJpc3MiOiJ0aGluZ3Nib2FyZC5pbyIsImlhdCI6MTY5MDM1NDY4MiwiZXhwIjoxNjkwMzYzNjgyLCJlbmFibGVkIjp0cnVlLCJpc1B1YmxpYyI6ZmFsc2UsInRlbmFudElkIjoiOWRlZmMxMjAtMDM3MC0xMWVlLTkwNTYtZTFjZDQwZDE3ZTk2IiwiY3VzdG9tZXJJZCI6IjEzODE0MDAwLTFkZDItMTFiMi04MDgwLTgwODA4MDgwODA4MCJ9.YC-bLWRA4BJl6I-zEVXR_JGcqpjRBw9R5Cdnv32ytgr2leFOhCd-fXR6ar3QFK6fU--V_lq1xPgxpvyM4A43Fw';
const httpOptions = {
  headers: new HttpHeaders({ 
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Max-Age": "3600",
  'Authorization': `Bearer ${auth_token}`
 })
};
const token = localStorage.getItem('token')
console.log(token)
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
}
