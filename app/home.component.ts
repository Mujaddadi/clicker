import { error } from 'util';
import { Component , OnInit  } from '@angular/core';
import { HttpService } from './services/httpService';
import { Router } from '@angular/router';

import { Auth } from './services/auth.service';
import * as moment from 'moment/moment';

@Component({
    moduleId: module.id,
    selector: 'home',
    templateUrl: 'home.component.html'
    
})
export class HomeComponent  implements OnInit {

     clicked: number; // To store the value of number of times user have clicked the button
     click_id: number; // To the store the ID of Clicks database entry
     user_ID : number;    // To the store the user ID 
      profile: any;        ////To save the user detail from Auth

      timeLastClicked: boolean;    // 
      timeClicked: number;     // How many time the button us clicked
      timeSinceLastClick: string ;   // 


     private clickURL: string = ' http://07f382a0.ngrok.io/click';
     private userAPIUrl: string = ' http://07f382a0.ngrok.io/user';

     constructor(private httpService: HttpService, private router: Router, private auth: Auth) {
            console.log("Runnning Home component Constructor");
     }


     updateClick() {

         let url = this.clickURL +  '/' + this.click_id;
         let newClick = this.clicked + 1;
         let obj = {click: newClick};

         this.httpService.updateData( url, obj ).subscribe(data => {
              this.clicked = newClick;

            });

            this.timeClicked = this.timeClicked + 1;

            this.userAPIUrl = ' http://07f382a0.ngrok.io/user' + "/" + this.user_ID;


            this.httpService.updateData( this.userAPIUrl, {'clicked': this.timeClicked}).subscribe(
                          data => {
       },                   error => console.log(error));


            // Disable the click button untill time is completed
            this.timeLastClicked = true;
     }


     redirect(pagename: string) {
                  this.router.navigate(['/' + pagename]);
        }


     ngOnInit() {
            console.log("Runnning ngOninit");
           // To get total numbr of clicks so far 
           this.httpService.getData(this.clickURL).subscribe(
                data => {
                this.clicked = data[0].click;
                this.click_id = data[0]._id;
         }, 
         error => console.log(error));

        
        this.profile = JSON.parse(localStorage.getItem('profile')) || {}; // Add to the profile

        // To get the loged user last clicked time
    

                
                
  //     if(this.auth.authenticated()) {
    
            console.log("In IF");

            console.log(this.userAPIUrl + '?email=' + localStorage.getItem('email'));
            
             this.httpService.getData(this.userAPIUrl + '?email=' + localStorage.getItem('email')).subscribe(
                data => {
        

                let b = moment(Date.now());
                let diff = 1440 / b.diff(data[0].updatedAt , 'minutes');


                        console.log("Time clicked so far "+data[0].clicked);
                this.timeSinceLastClick = moment(data[0].updatedAt).format('MMMM Do YYYY, h:mm:ss a');

                this.timeClicked = data[0].clicked; // get the number of times User clicked
                this.user_ID = data[0]._id;

                console.log('The user ID is' + this.user_ID);

                if (diff > 1 &&  this.timeClicked !== 0){
                        this.timeLastClicked = true ;
                }  else {
                    this.timeLastClicked = false ;
                }
             },
                 error => console.log(error));
        }
        
     
        
   //  }

}


