import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Service */
import { LocationService } from './location.service';
import { FoodService } from './food.service';
import { GlobalService } from './global.service';
import { UserService } from "./user.service";

@NgModule({
    imports: [
        CommonModule,
    ],
    providers: [
        { provide: 'LocationService', useClass: LocationService },
        { provide: 'FoodService', useClass: FoodService },
        { provide: 'GlobalService', useClass: GlobalService },
        { provide: 'UserService', useClass: UserService }
    ],
    declarations: [
        
    ]
})
export class CoreModule {
    constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
        if(parentModule) {
            throw new Error('CoreModule is already loaded!');
        }
    }
}