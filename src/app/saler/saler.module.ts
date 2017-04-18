import { NgModule } from '@angular/core';

/* Routing Module */
import { SalerRoutingModule } from "./saler-routing.module";
import { ShareModule } from "../share/share.module";

/* Style Module */
import { PaginationModule } from "ngx-bootstrap/pagination";
import { ModalModule } from "ngx-bootstrap/modal";
import { ChartsModule } from "ng2-charts";

/* Component */
import { SalerComponent } from "./saler/saler.component";
import { AdminComponent } from "./admin/admin.component";
import { FoodComponent } from "./food/food.component";
import { AddDialogComponent } from "./dialog/add-dialog.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

@NgModule({
    imports: [
        SalerRoutingModule,
        ShareModule,

        PaginationModule.forRoot(),
        ModalModule.forRoot(),
        ChartsModule
    ],
    declarations: [
        SalerComponent,
        AdminComponent,
        FoodComponent,
        AddDialogComponent,
        DashboardComponent
    ],
    entryComponents: [
        AddDialogComponent
    ]
})
export class SalerModule {}