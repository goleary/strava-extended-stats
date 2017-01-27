import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { JsonpModule, HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { Storage } from '@ionic/storage';

import { AppComponent } from './app.component';
import { StravaAuthComponent } from './strava-auth/strava-auth.component';
import { TestComponent } from './test/test.component';
import { TokenExchangeComponent } from './token-exchange/token-exchange.component';
import { StravaApiService } from './strava-api.service';
import { DashboardComponent } from './dashboard/dashboard.component';

export function provideStorage() {
 return new Storage();
}

@NgModule({
  declarations: [
    AppComponent,
    StravaAuthComponent,
    TestComponent,
    TokenExchangeComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    MaterialModule,
    RouterModule.forRoot([
      {
        path: 'test',
        component: TestComponent
      },
      {
        path: 'auth',
        component: StravaAuthComponent
      },
      {
        path: 'token-exchange',
        component: TokenExchangeComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      }
    ]),
    JsonpModule,
    HttpModule
  ],
  providers: [
    { provide: Storage, useFactory: provideStorage },
    StravaApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
