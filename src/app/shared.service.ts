import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  sidebarValue: boolean= true;
  constructor() { }
}
