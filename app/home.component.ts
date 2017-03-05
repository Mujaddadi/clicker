import {error} from 'util';
import {Component, OnInit} from '@angular/core';
import {HttpService} from './services/httpService';
import {Router} from '@angular/router';

import {Auth} from './services/auth.service';
import * as moment from 'moment/moment';

@Component({moduleId: module.id, selector: 'home', templateUrl: 'home.component.html', styleUrls: ["home.component.css"]}) // Component Meta Data

export class HomeComponent implements OnInit {

  clicked : number; // To store the value of number of times user have clicked the button
  click_id : number; // To the store the ID of Clicks database entry
  user_ID : number; // To the store the user ID
  profile : any; ////To save the user detail from Auth

  timeLastClicked : boolean; //
  buttonClicked : number; // How many time the button is clicked
  timeSinceLastClick : string; //

  gotData : boolean;

  private clickURL : string = ' http://07f382a0.ngrok.io/click';
  private userAPIUrl : string = ' http://07f382a0.ngrok.io/user';

  constructor(private httpService : HttpService, private router : Router, private auth : Auth) {
    console.log("Runnning Home component Constructor");
  }

  updateClick() {

    let url = this.clickURL + '/' + this.click_id; //concatenate the click API URL with the id of click object in databse.
    let newClick = this.clicked + 1; // Increase the number of click of user

    let obj = { // object will be passed to httpService updateData service. It will represent the new click value of user
      click: newClick
    };

    // update the number of clicks by user
    this
      .httpService
      .updateData(url, obj)
      .subscribe(data => {
        this.clicked = newClick;

      });

    this.buttonClicked = this.buttonClicked + 1; // Increase the number overall of clicks of button

    this.userAPIUrl = ' http://07f382a0.ngrok.io/user/' + this.user_ID; //concatenate the user API URL with the id of user to update the clicks.

    this
      .httpService
      .updateData(this.userAPIUrl, {'clicked': this.buttonClicked})
      .subscribe(data => {}, error => console.log(error));

    // Disable the click button untill time is completed
    this.timeLastClicked = true;
  }

  redirect(pagename : string) {
    this
      .router
      .navigate(['/' + pagename]);
  }

  ngOnInit() {
    console.log("Runnning ngOninit");

    // To get total number of clicks
    this
      .httpService
      .getData(this.clickURL)
      .subscribe(data => {
        this.clicked = data[0].click;
        this.click_id = data[0]._id;
      }, error => console.log(error));

    this.profile = JSON.parse(localStorage.getItem('profile')) || {}; // parse the profile object stored by Auth0 after returing the profile information

    // To stop the code from running if the user is not authenticated.
    if (this.auth.authenticated()) {

      console.log(this.userAPIUrl + '?email=' + localStorage.getItem('email'));

      //To check whether we got the data
      if (localStorage.getItem('email')) 
        this.gotData = true;
      
      //Get the user data based on the email fetch from Auth0
      this
        .httpService
        .getData(this.userAPIUrl + '?email=' + localStorage.getItem('email'))
        .subscribe(data => {

          let b = moment(Date.now()); //Get the current time

          let diff = 1440 / b.diff(data[0].updatedAt, 'minutes'); // Divide the clicked time of user with the total number of minutes in 24 hours

          console.log("Time clicked so far " + data[0].clicked);

          this.timeSinceLastClick = moment(data[0].updatedAt).format('MMMM Do YYYY, h:mm:ss a'); // Add the user clicked time for data bidning

          this.buttonClicked = data[0].clicked; // get the number of times User clicked at the button

          this.user_ID = data[0]._id; //Get the user ID for updating the user click time at the database

          console.log('The user ID is' + this.user_ID);

          //check if user clicked within last 24 hours, if yes then disable the button.

          if (diff > 1 && this.buttonClicked !== 0) {
            this.timeLastClicked = true;
          } else {
            this.timeLastClicked = false;
          }
        }, error => console.log(error));
    }

  }

}