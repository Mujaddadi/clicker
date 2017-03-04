import { Component } from '@angular/core';
import { Auth } from './services/auth.service';

@Component({
    moduleId: module.id,
    templateUrl: 'profile.component.html',

})

export class Profile {
    profile: any;

    constructor(private auth: Auth){
        this.profile = JSON.parse(localStorage.getItem('profile'));
    }
 }
