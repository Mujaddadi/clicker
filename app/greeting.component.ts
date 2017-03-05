
import { Component, OnInit  } from '@angular/core';
import { Auth } from './services/auth.service';


@Component({
    moduleId: module.id,
    templateUrl: 'greeting.component.html'
})
export class Greetings{ 

    greet : string = "Welcome to the clicker. Click at the home pogae to click and see your status of click"

 constructor(private auth: Auth) {
  }

    
}
