import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserComponent } from './user/user.component';
import { LoginComponent } from "../share/login/login.component";
import { RegisterComponent } from "../share/register/register.component";

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: UserComponent, children: [
                { path: '', redirectTo: 'login', pathMatch: 'full' },
                { path: 'login', component: LoginComponent, data: { 'type': 'user'} },
                { path: 'register', component: RegisterComponent, data: { 'type': 'user'} }
            ]}
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class UserRoutingModule {}