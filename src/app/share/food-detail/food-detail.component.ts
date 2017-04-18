import { Component } from '@angular/core';

import { Food } from "../../core/model/food.model";

@Component({
    selector: 'app-food-detail',
    templateUrl: './food-detail.component.html',
    styleUrls: ['./food-detail.component.css']
})
export class FoodDetailComponent {
    public food:Food;

    constructor() {}
}