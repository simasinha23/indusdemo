import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
// import { MsalService } from '@azure/msal-angular';
import { SharedService } from 'src/app/shared.service';

const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';

type ProfileType = {
  givenName?: string,
  surname?: string,
  userPrincipalName?: string,
  id?: string
};

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  title = 'Indus';
  image_url = "https://www.industowers.com/wp-content/themes/indus/images/logo.svg"

  constructor (
    // private authService: MsalService, private http: HttpClient, 
    private sharedService: SharedService){}

  // profile!: ProfileType;

  // logout() {
  //   this.authService.logoutPopup({
  //     mainWindowRedirectUri: "/"
  //   });
  // }

  ngOnInit() {
    // this.getProfile();
  }

  // getProfile() {
  //   this.http.get(GRAPH_ENDPOINT)
  //     .subscribe(profile => {
  //       this.profile = profile;
  //     });
  // }

  sidenavToggle() {
    this.sharedService.sidebarValue = !this.sharedService.sidebarValue;
    console.log(this.sharedService.sidebarValue);
  }
}
