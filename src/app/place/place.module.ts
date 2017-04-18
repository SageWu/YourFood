import { NgModule } from '@angular/core';

/* Style Module */
import { RatingModule } from 'ngx-bootstrap/rating';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

/* Routing Module */
import { PlaceRoutingModule } from './place-routing.module';
import { ShareModule } from "../share/share.module";

/* Component */
import { PlaceComponent } from './place/place.component';
import { SalerListComponent } from './saler-list/saler-list.component';
import { SalerListPipe } from './saler-list/saler-list.pipe';
import { SalerDetailComponent } from './saler-detail/saler-detail.component';
import { SortFoodsPipe } from './saler-detail/sort-foods.pipe';

@NgModule({
    declarations: [
        PlaceComponent,
        SalerListComponent,
        SalerListPipe,
        SalerDetailComponent,
        SortFoodsPipe
    ],
    imports: [
        PlaceRoutingModule,
        ShareModule,

        RatingModule.forRoot(),
        TooltipModule.forRoot(),
    ],
    providers: []
})
export class PlaceModule {}