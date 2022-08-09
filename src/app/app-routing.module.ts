import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AppComponent} from "./app.component";

const routes: Routes = [
  { path: "landing", loadChildren: () => import('./modules/landing/landing.module').then(m => m.LandingModule)},
  { path: "dashboard", loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)},
  { path: "sign-in", loadChildren: () => import('./modules/sign-in/sign-in.module').then(m => m.SignInModule)},
  { path: "", component: AppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
