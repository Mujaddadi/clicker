
// app.routes.ts
import {ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent }  from './home.component';
import { User }  from './user.component';
import { UserAuthentication }  from './userAuthent.component';


const appRoutes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'login', component: UserAuthentication },
  { path: 'user', component: User },
  { path: '**', redirectTo: 'home' , pathMatch: 'full' },
  { path: '', redirectTo: 'home' , pathMatch: 'full' },
];

export const appRoutingProvider: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);