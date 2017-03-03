import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
// import { RouterModule } from '@angular/router';

import { AppComponent }  from './app.component';
// import { WelcomeComponent }  from './home/welcome.component';
import { HttpService } from './services/httpService';

@NgModule({
  imports: [ BrowserModule,
  HttpModule,
 /* RouterModule.forRoot([
      {path: 'Welcome', component: WelcomeComponent },
      {path: '', redirectTo: 'Welcome', pathMatch: 'full' },
      {path: '**', redirectTo: 'Welcome', pathMatch: 'full' },
    ])*/
   ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ],
  providers: [
        HttpService

     ],
})
export class AppModule {

}
