// app.routes.ts
import {ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent }  from './home.component';
import { UserAuthentication }  from './userAuthent.component';
import { Greetings } from './greeting.component';
import { Profile }  from './profile.component';
import { AuthGuard }  from './auth.guard';


const appRoutes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'login', component: UserAuthentication },
  { path: 'greetings', component: Greetings},
  { path: 'profile', component: Profile},
  { path: '**', redirectTo: 'home' , pathMatch: 'full' },
  { path: '', redirectTo: 'home' , pathMatch: 'full' },
];

export const appRoutingProvider: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);