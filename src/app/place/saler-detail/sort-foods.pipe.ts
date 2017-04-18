import { Pipe, PipeTransform } from '@angular/core';

import { Food } from '../../core/model/food.model';

@Pipe({
    name: 'sortFoods'
})
export class SortFoodsPipe implements PipeTransform {
    private origin_foods: Array<Food>;

    transform(foods: Array<Food>, sort_by: string): Array<Food> {
        if(foods == undefined)
            return undefined;

        if(sort_by == 'default')
        {
            if(this.origin_foods == undefined)
            {
                this.origin_foods = new Array<Food>();
                this.origin_foods = foods.slice();
            }
            return this.origin_foods;
        }

        return foods.sort(
            (a: Food, b: Food) => {
                if(a[sort_by] < b[sort_by])
                    return 1;
                return 0;
            }
        );
    }
}