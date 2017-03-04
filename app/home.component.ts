import { IDisabledInterval } from 'tslint/lib/lint';
import { error } from 'util';
import { Component , OnInit  } from '@angular/core';
import { HttpService } from './services/httpService';
import { Router } from '@angular/router';

import { Auth } from './services/auth.service';
import * as moment from 'moment/moment';

@Component({
    moduleId: module.id,
    selector: 'home',
    templateUrl: 'home.component.html',
})
export class HomeComponent  implements OnInit{ 

     clicked: number;
     updateClicked: string;
     _id: number; //Click ID
     user_ID : number;
      profile: any;

      timeLastClicked: any;
      timeClicked: number;


     private clickURL: string = 'http://localhost:3500/click';
     private userAPIUrl: string = 'http://localhost:3500/user';

     constructor(private httpService: HttpService, private router: Router, private auth: Auth) {

     }


     updateClick() {

         let url = this.clickURL +  '/' + this._id;
         let newClick = this.clicked + 1;
         let obj = {click: newClick};

         this.httpService.updateData( url, obj ).subscribe(data => {
              this.clicked = newClick;

            });


            this.userAPIUrl = 'http://localhost:3500/user' + "/" + this.user_ID;

            this.httpService.updateData( this.userAPIUrl, {'clicked': ++this.timeClicked}).subscribe(
                          data => {
       },                   error => console.log(error));


            // Disable the click button untill time is completed
            this.timeLastClicked = true;
     }


     redirect(pagename: string) {
                  this.router.navigate(['/' + pagename]);
        }


     ngOnInit() {

           // To get total numbr of clicks so far 
           this.httpService.getData(this.clickURL).subscribe(
                data => {
                this.clicked = data[0].click;
                this._id = data[0]._id;
         }, 
         error => console.log(error));


        this.profile = JSON.parse(localStorage.getItem('profile')) || {}; // Add to the profile

        // To get the loged user last clicked time
         this.httpService.getData(this.userAPIUrl + '?email=' + localStorage.getItem('email')).subscribe(
                data => {

                let b = moment(Date.now());
                let diff= 1440 / b.diff(data[0].updatedAt , 'minutes');

                this.timeClicked = data[0].clicked; // get the number of times User clicked
                this.user_ID = data[0]._id;

                if(diff > 1 &&  this.timeClicked !== 0){
                        this.timeLastClicked = true ;
                }

                else{
                    this.timeLastClicked = false ;
                }
             }, 
         error => console.log(error));
            }

}
