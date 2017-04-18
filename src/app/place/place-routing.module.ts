import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlaceComponent } from './place/place.component';
import { SalerListComponent } from './saler-list/saler-list.component';
import { SalerDetailComponent } from './saler-detail/saler-detail.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: PlaceComponent, children: [
                { path: '', component: SalerListComponent },
                { path: 'shop/:id', component: SalerDetailComponent }
            ] }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class PlaceRoutingModule {}