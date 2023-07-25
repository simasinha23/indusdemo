import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
// import { BrowserUtils } from "@azure/msal-browser";
import { LoginComponent } from "./login/login.component";
// import { MsalGuard } from "@azure/msal-angular";
import { PagesModule } from "./pages/pages.module";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/pages/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/pages/home', pathMatch: 'full' },
  { path: 'pages', 
    loadChildren: ()=>import('./pages/pages.module').then(m=>PagesModule),
    // canActivate: [MsalGuard]
  }

];

// const isIframe = window !== window.parent && !window.opener;

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // useHash:true,
      // Don't perform initial navigation in iframes or popups
      // initialNavigation:
      //   !BrowserUtils.isInIframe() && !BrowserUtils.isInPopup()
      //     ? "enabledNonBlocking"
      //     : "disabled", // Set to enabledBlocking to use Angular Universal
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}