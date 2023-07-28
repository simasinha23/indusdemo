import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { ViewRuleComponent } from './view-rule/view-rule.component';
import { Usecase1Component } from './usecase1/usecase1.component';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  // { path: 'home', component: Usecase1Component },
  // { path: 'view-all', component: ViewRuleComponent },
  {

    path: '',

    component: PagesComponent,

    children: [

        { path: '', redirectTo: '/home', pathMatch: 'full' },

        { path: 'home', component: Usecase1Component },
        { path: 'view-all', component: ViewRuleComponent },

    ]

}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
