import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AUTH_PROVIDERS } from 'angular2-jwt';

import { AppComponent }  from './app.component';
import { HomeComponent }  from './home.component';
import { User }  from './user.component';
import { Profile }  from './profile.component';
import { UserAuthentication }  from './userAuthent.component';
import { routing, appRoutingProvider } from './app.routes';

import { Auth } from './services/auth.service';
import { HttpService } from './services/httpService';

@NgModule({
  imports: [ BrowserModule, HttpModule, routing],
  declarations: [ AppComponent, UserAuthentication, User, HomeComponent, Profile ],
  bootstrap: [ AppComponent ],
  providers: [
        HttpService,
        appRoutingProvider,
        AUTH_PROVIDERS,
        Auth
     ],
})
export class AppModule {

}
