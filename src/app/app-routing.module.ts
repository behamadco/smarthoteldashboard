import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthComponent } from './auth/auth.component';
import { RoomComponent } from './room/room.component';
import { RoomDetailComponent } from './room-detail/room-detail.component';
import { TravelerListComponent } from './traveler-list/traveler-list.component';

const routes: Routes = [
  {
    path: "", redirectTo:'auth', pathMatch:'full'
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
  },
  {
    path: "travelers", component: TravelerListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
