
import { Component, OnInit  } from '@angular/core';
import { Auth } from './services/auth.service';


@Component({
    moduleId: module.id,
    selector: 'app',
    templateUrl: 'app.component.html'
})
export class AppComponent  implements OnInit{ 

 constructor(private auth: Auth) {
  }

    login(){

        this.auth.login()
    }

    
    logout(){

        this.auth.logout()
    }

       ngOnInit() {


       }
    
}
