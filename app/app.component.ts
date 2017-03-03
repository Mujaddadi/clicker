import { error } from 'util';
import { Component , OnInit  } from '@angular/core';
import { HttpService } from './services/httpService';

@Component({
    moduleId: module.id,
    selector: 'pm-app',
    templateUrl: 'app.component.html'
})
export class AppComponent  implements OnInit{ 

     clicked: number;
     updateClicked: string;
     _id: number;


     private clickURL: string = 'http://localhost:3500/click';

     constructor(private httpService: HttpService) {}


     updateClick() {

         let url = this.clickURL +  '/' + this._id;
         let newClick = this.clicked + 1;
         let obj = {click: newClick};
         console.log(obj);

          this.httpService.updateData( url, obj ).subscribe(data => {
              this.clicked = newClick;

            });
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
