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
    this.lock.on("authenticated", (authResult: any) => {
      localStorage.setItem('id_token', authResult.idToken);

      // Fetch profile information
      this.lock.getProfile(authResult.idToken, (error: any, profile: any) => {
        if (error) {
          // Handle error
          alert(error);
          return;
        }

        localStorage.setItem('profile', JSON.stringify(profile));
        this.userProfile = profile;

        localStorage.setItem('email',  profile.email);


      // Getting the user Informaion from local databse. If not found in databse, new entry will be added to database
        this.httpService.getData('http://localhost:3500/user?email=' +  profile.email).subscribe(
                data => {
                   if(data.length === 0)
                    {

                    this.httpService.setData('http://localhost:3500/user',{'username': profile.name,	'email': profile.email, 'clicked': 0}).subscribe(
                          data => {
            
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