import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  {
    path: "", component:DashboardComponent
  },
  {
    path: "dashboard", component: DashboardComponent
  },
  {
    path: "auth", component: AuthComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
