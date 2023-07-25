import { Component, DoCheck, OnInit, SimpleChanges } from '@angular/core';
// import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
// import { EventMessage, EventType, InteractionStatus } from '@azure/msal-browser';
import { filter } from 'rxjs/operators';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, DoCheck {
  
  constructor(
    // private authService: MsalService, private msalBroadcastService: MsalBroadcastService, 
    public sharedService: SharedService) { }
 
  loginDisplay = false;
  events: string[] = [];
  opened: boolean = this.sharedService.sidebarValue;

  ngOnInit(): void {
    // this.msalBroadcastService.msalSubject$
    //   .pipe(
    //     filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
    //   )
    //   .subscribe((result: EventMessage) => {
    //     console.log(result);
    //   });

    // this.msalBroadcastService.inProgress$
    //   .pipe(
    //     filter((status: InteractionStatus) => status === InteractionStatus.None)
    //   )
    //   .subscribe(() => {
    //     this.setLoginDisplay();
    //   });
  }

  setLoginDisplay() {
    // this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  ngDoCheck() {
    this.opened = this.sharedService.sidebarValue;
    console.log(this.sharedService.sidebarValue);
  }
}