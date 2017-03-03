import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { HomeComponent }  from './home.component';
import { User }  from './user.component';
import { UserAuthentication }  from './userAuthent.component';
import { routing, appRoutingProvider } from './app.routes';

import { HttpService } from './services/httpService';

@NgModule({
  imports: [ BrowserModule, HttpModule, routing],
  declarations: [ AppComponent, UserAuthentication, User, HomeComponent ],
  bootstrap: [ AppComponent ],
  providers: [
        HttpService, appRoutingProvider
     ],
})
export class AppModule {

}
