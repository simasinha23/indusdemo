import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'pages-root',
  templateUrl: './pages.component.html'
})
export class PagesComponent implements OnInit{
  title = 'New-TowerApp';
  loginDisplay = false;
  events: string[] = [];
  opened: boolean = this.sharedService.sidebarValue;
  constructor(private apiService: ApiServiceService, public sharedService: SharedService){
  }

  ngOnInit(){
    this.apiService.initializeApp().subscribe(res => {
      let response = Object.values(res);
      localStorage.setItem('token',response[0])
    });
  }
  

  // ngOnInit(): void {
  //   // this.msalBroadcastService.msalSubject$
  //   //   .pipe(
  //   //     filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
  //   //   )
  //   //   .subscribe((result: EventMessage) => {
  //   //     console.log(result);
  //   //   });

  //   // this.msalBroadcastService.inProgress$
  //   //   .pipe(
  //   //     filter((status: InteractionStatus) => status === InteractionStatus.None)
  //   //   )
  //   //   .subscribe(() => {
  //   //     this.setLoginDisplay();
  //   //   });
  // }

  setLoginDisplay() {
    // this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  ngDoCheck() {
    this.opened = this.sharedService.sidebarValue;
    console.log(this.sharedService.sidebarValue);
  }

 

}