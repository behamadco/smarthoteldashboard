import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AuthComponent } from './auth/auth.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { HttpClientModule } from '@angular/common/http';
import { RoomComponent } from './room/room.component';
import { RoomDetailComponent } from './room-detail/room-detail.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NoopAnimationPlayer } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TravelerListComponent } from './traveler-list/traveler-list.component';
import { TravelerDetailComponent } from './traveler-detail/traveler-detail.component';
import { CommonModule } from '@angular/common';
import { FinancialComponent } from './financial/financial.component';
import { AppSetting } from './configuration/config';
import { IMqttServiceOptions, MqttModule } from 'ngx-mqtt';
import { BillDetailComponent } from './bill-detail/bill-detail.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';



const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: AppSetting.mqttBroker,
  port: AppSetting.mqttPort,
  protocol: 'ws',
  path: AppSetting.mqttPath,
};


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    AuthComponent,
    RoomComponent,
    RoomDetailComponent,
    TravelerListComponent,
    TravelerDetailComponent,
    FinancialComponent,
    BillDetailComponent
  ],
  imports: [
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    BrowserModule,
    AppRoutingModule,
    NgApexchartsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
