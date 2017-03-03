import { Component } from '@angular/core';



@Component({
    moduleId: module.id,
    selector: 'user-login',
    templateUrl: 'userAuthent.component.html',
    styleUrls: ['userAuthent.component.css']

})

export class UserAuthentication
 {

    constructor() {
        console.log('Working');
    }
 }