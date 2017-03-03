
import { error } from 'util';
import { Component , OnInit  } from '@angular/core';
import { HttpService } from './services/httpService';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'user',
    templateUrl: 'user.component.html'

})


export class User  implements OnInit{ 

     clicked: number;
     updateClicked: string;
     _id: number;

     private clickURL: string = 'http://localhost:3500/click';

     constructor(private httpService: HttpService, private router: Router) {}


     updateClick() {

         let url = this.clickURL +  '/' + this._id;
         let newClick = this.clicked + 1;
         let obj = {click: newClick};
         console.log(obj);

          this.httpService.updateData( url, obj ).subscribe(data => {
              this.clicked = newClick;

            });
     }

       redirect(pagename: string) {
                  this.router.navigate(['/' + pagename]);
        }

     ngOnInit() {
            console.log('Starting');
            this.httpService.getData(this.clickURL).subscribe(
                data => {
                this.clicked = data[0].click;
                this._id = data[0]._id;

                console.log(this._id);
         }, 
         error => console.log(error));
    }

}
