import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

/* Style module */
import { MaterialModule } from '@angular/material';
import { TooltipModule } from "ngx-bootstrap/tooltip";

/* Component */
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { FoodDetailComponent } from "./food-detail/food-detail.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        MaterialModule,
        TooltipModule.forRoot()
    ],
    declarations: [
        LoginComponent,
        RegisterComponent,
        FoodDetailComponent
    ],
    entryComponents: [
        FoodDetailComponent
    ],
    exports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,

        LoginComponent,
        RegisterComponent,
        FoodDetailComponent
    ]
})
export class ShareModule {}