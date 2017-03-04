import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { HttpService } from './httpService';

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class Auth {
  // Configure Auth0
  lock = new Auth0Lock('kiFEDR9RJ4dos13YxmGDGz8Q7xVmHbwx', 'tahahassan.eu.auth0.com', {});

   userProfile: Object;

constructor(private httpService: HttpService) {
    // Set userProfile attribute of already saved profile
    this.userProfile = JSON.parse(localStorage.getItem('profile'));

    // Add callback for the Lock `authenticated` event
    this.lock.on("authenticated", (authResult) => {
      localStorage.setItem('id_token', authResult.idToken);

      // Fetch profile information
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          // Handle error
          alert(error);
          return;
        }

        localStorage.setItem('profile', JSON.stringify(profile));
        this.userProfile = profile;


         let userEmail: any = JSON.parse(localStorage.getItem('profile')).email;
         let userName: any = JSON.parse(localStorage.getItem('profile')).name;

   // Getting the user Informaion from local databse
        this.httpService.getData('http://localhost:3500/user?email=' +  userEmail).subscribe(
                data => {
                   if(data.length === 0)
                    {
                      
                    this.httpService.setData('http://localhost:3500/user',{'username': userName,	'email': userEmail, 'click': 0}).subscribe(
                          data => {
                         // console.log(JSON.parse(localStorage.getItem('profile')).email);
                   }, 
                   error => console.log(error));

                    }

                 }, error => console.log(error));

      });
    });
  }

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  }

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  }

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    this.userProfile = undefined;
  }
}