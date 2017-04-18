import { Pipe, PipeTransform } from '@angular/core';

import { Shop } from '../../core/model/shop.model';

@Pipe({
    name: 'filterShops'
})
export class SalerListPipe implements PipeTransform {
    transform(shops: Array<Shop>, id: String): Array<Shop> {
        if(id == '0')
            return shops;

        return shops.filter(
            (shop) => {
                if(shop.type_id == id)
                    return shop;
            }
        );
    }
}