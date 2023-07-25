import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'http://35.200.254.232:8080/api/'

  public getDeviceList(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  public getDeviceId(data:any): Observable<any> {
    return this.http.get<any>(this.apiUrl+'tenant/devices?deviceName='+data);
  }

  public getParameterList(deviceId: any): Observable<any> {
    return this.http.get<any>(this.apiUrl+'plugins/telemetry/DEVICE/'+deviceId+'/keys/attributes');
  }

  public fetchCurrentData(data:any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  public getOperatorList(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }


}
