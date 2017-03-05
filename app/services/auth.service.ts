import {Injectable} from '@angular/core';
import {tokenNotExpired} from 'angular2-jwt';
import {HttpService} from './httpService';

// Avoid name not found warnings
declare var Auth0Lock : any;

@Injectable()
export class Auth {
  // Configure Auth0

  lock = new Auth0Lock('kiFEDR9RJ4dos13YxmGDGz8Q7xVmHbwx', 'tahahassan.eu.auth0.com', {});

  userProfile : Object;

  constructor(private httpService : HttpService) {

    console.log("Running Auth");

    // Set userProfile attribute of already saved profile
    this.userProfile = JSON.parse(localStorage.getItem('profile'));

    // Add callback for the Lock `authenticated` event
    this
      .lock
      .on("authenticated", (authResult : any) => {

        localStorage.setItem('id_token', authResult.idToken);

        console.log("Fetching Profile Data");

        // Fetch profile information
        this
          .lock
          .getProfile(authResult.idToken, (error : any, profile : any) => {
            if (error) {
              // Handle error
              alert(error);
              return;
            }

            localStorage.setItem('profile', JSON.stringify(profile));
            this.userProfile = profile;

            console.log(profile);
            localStorage.setItem('email', profile.email);

            // Getting the user Informaion from local databse. If not found in databse, new
            // entry will be added to database
            this
              .httpService
              .getData(' http://07f382a0.ngrok.io/user?email=' + profile.email)
              .subscribe(data => {
                console.log("Got Data");
                if (data.length === 0) {

                  localStorage.setItem('timelastClicked', "0");

                  this
                    .httpService
                    .setData(' http://07f382a0.ngrok.io/user', {
                      'username': profile.name,
                      'email': profile.email,
                      'clicked': 0
                    })
                    .subscribe(data => {}, error => console.log(error));

                } else {

                  localStorage.setItem('timelastClicked', data.updatedAt);
                }

              }, error => console.log(error));

          });

      });
  }

  public login() {
    // Call the show method to display the widget.
    this
      .lock
      .show((err : string, profile : string, id_token : string) => {
        if (err) {
          console.log(err);
        }
        console.log(profile);
        console.log(id_token);
      });
  }

  public authenticated() {
    // Check if there's an unexpired JWT This searches for an item in localStorage
    // with key == 'id_token'
    return tokenNotExpired();
  }

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    localStorage.removeItem('email');
    this.userProfile = undefined;
  }
}
