import { CommonModule } from '@angular/common';  
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http"; // Import

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

// import { APP_INITIALIZER } from '@angular/core';
// import { AppInitializer, appInitializer } from './app-initializer';

// import {
//   MsalModule,
//   MsalRedirectComponent,
//   MsalGuard,
//   MsalInterceptor,
// } from "@azure/msal-angular";
// import {
//   InteractionType,
//   PublicClientApplication,
// } from "@azure/msal-browser";

const isIE =
  window.navigator.userAgent.indexOf("MSIE ") > -1 ||
  window.navigator.userAgent.indexOf("Trident/") > -1;

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    // MsalModule.forRoot(
    //   new PublicClientApplication({
    //     auth: {
    //       clientId: '0982440c-7c53-42b9-b3d8-47d3d9a5aa6d', //uat 
    //       // clientId: '30b20fc4-f183-48b5-a110-1e0e98cea210', //prod  
    //       authority: 'https://login.microsoftonline.com/d5ba756c-9f29-424a-a57d-6f57119e0656',
    //       redirectUri: 'https://snmp-poc-indus.de.r.appspot.com', //uat url
    //       // redirectUri: 'https://smarttowers.industowers.com',  //prod url
    //       // redirectUri: 'http://localhost:4002'
    //     },
    //     cache: {
    //       cacheLocation: "localStorage",
    //       storeAuthStateInCookie: isIE,
    //     },
    //   }),
    //   {
    //     interactionType: InteractionType.Redirect,
    //     authRequest: {
    //       scopes: ["user.read"],
    //     },
    //   },
    //   {
    //     interactionType: InteractionType.Redirect,
    //     protectedResourceMap: new Map([
    //       ['https://graph.microsoft.com/v1.0/me', ["user.read"]],
    //     ]),
    //   }
    // ),
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: MsalInterceptor,
    //   multi: true,
    // },
    // MsalGuard,
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: appInitializer,
    //   deps: [AppInitializer],
    //   multi: true
    // }
  ],
  // bootstrap: [AppComponent, MsalRedirectComponent],
  bootstrap: [AppComponent],
  
})
export class AppModule {}