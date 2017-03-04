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
     _id: number;
      profile: any;

     private clickURL: string = 'http://localhost:3500/click';

     constructor(private httpService: HttpService, private router: Router, private auth: Auth) {
         this.profile = JSON.parse(localStorage.getItem('profile')) || {};
     }


     updateClick() {

         let url = this.clickURL +  '/' + this._id;
         let newClick = this.clicked + 1;
         let obj = {click: newClick};

         this.httpService.updateData( url, obj ).subscribe(data => {
              this.clicked = newClick;

            });
     }


    /* updateUserClick() {

         let url = this.clickURL +  '/' + this._id;
         let newClick = this.clicked + 1;
         let obj = {click: newClick};

         this.httpService.updateData( url, obj ).subscribe(data => {
              this.clicked = newClick;

            });
     }*/

     redirect(pagename: string) {
                  this.router.navigate(['/' + pagename]);
        }


     ngOnInit() {

            this.httpService.getData(this.clickURL).subscribe(
                data => {
                this.clicked = data[0].click;
                this._id = data[0]._id;


         }, 
         error => console.log(error));

    }

}
