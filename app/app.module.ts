import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AUTH_PROVIDERS } from 'angular2-jwt';

import { AppComponent }  from './app.component';
import { HomeComponent }  from './home.component';
import { Greetings }  from './greeting.component';
import { Profile }  from './profile.component';
import { UserAuthentication }  from './userAuthent.component';
import { routing, appRoutingProvider } from './app.routes';

import { Auth } from './services/auth.service';
import { HttpService } from './services/httpService';

import {
   AuthGuard }  from './auth.guard';

@NgModule({
  imports: [ BrowserModule, HttpModule, routing],
  declarations: [ AppComponent, UserAuthentication, HomeComponent, Profile, Greetings ],
  bootstrap: [ AppComponent ],
  providers: [
        HttpService,
        appRoutingProvider,
        AUTH_PROVIDERS,
        Auth,
        AuthGuard
     ],
})
export class AppModule {

}
