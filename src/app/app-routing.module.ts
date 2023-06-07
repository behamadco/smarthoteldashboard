import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthComponent } from './auth/auth.component';
import { RoomComponent } from './room/room.component';
import { RoomDetailComponent } from './room-detail/room-detail.component';

const routes: Routes = [
  {
    path: "", redirectTo:'dashboard', pathMatch:'full'
  },
  {
    path: "dashboard", component: DashboardComponent
  },
  {
    path: "auth", component: AuthComponent
  },
  {
    path: "rooms", component: RoomComponent
  },
  {
    path: "room-detail", component: RoomDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
