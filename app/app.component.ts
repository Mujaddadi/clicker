
import { Component  } from '@angular/core';

import * as moment from 'moment/moment';

import { Auth } from './services/auth.service';


@Component({
    moduleId: module.id,
    selector: 'app',
    templateUrl: 'app.component.html'
})
export class AppComponent{ 

    constructor(private auth: Auth){
           
           let a = moment(1488618697790);
           let b = moment(Date.now());
           let days = b.diff(a, 'minutes');

           console.log(days);

    }
}
