import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { StravaAuthComponent } from './strava-auth/strava-auth.component';
import { TestComponent } from './test/test.component';
import { TokenExchangeComponent } from './token-exchange/token-exchange.component';


@NgModule({
  declarations: [
    AppComponent,
    StravaAuthComponent,
    TestComponent,
    TokenExchangeComponent
  ],
  imports: [
    BrowserModule,
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
      }
    ]),
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
