import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SalerComponent } from "./saler/saler.component";
import { LoginComponent } from "../share/login/login.component";
import { RegisterComponent } from "../share/register/register.component";
import { AdminComponent } from "./admin/admin.component";
import { FoodComponent } from "./food/food.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: SalerComponent, children: [
                { path: '', redirectTo: 'login', pathMatch: 'full' },
                { path: 'login', component: LoginComponent, data: { 'type': 'saler' } },
                { path: 'register', component: RegisterComponent, data: { 'type': 'saler' } },
                { path: 'center', component: AdminComponent, children: [
                    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
                    { path: 'dashboard', component: DashboardComponent },
                    { path: 'food', component: FoodComponent }
                ] }
            ]}
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class SalerRoutingModule {}