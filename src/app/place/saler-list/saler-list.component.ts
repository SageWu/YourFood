import { Component, Inject, OnInit } from '@angular/core';

import { Shop } from '../../core/model/shop.model';

@Component({
    selector: 'app-saler-list',
    templateUrl: './saler-list.component.html',
    styleUrls: ['./saler-list.component.css']
})
export class SalerListComponent implements OnInit {
    public shop_types: Array<Object>;
    public selected_type_id: String;

    public is_spinning: Boolean;
    public message: String;
    public shops: Array<Shop>;

    constructor(@Inject('FoodService') private food_service,
        @Inject('LocationService') private location_service,
        @Inject('GlobalService') private global_service) {
            this.global_service.navbar_status = true;

            this.selected_type_id = '0';
            this.message = '';
    }

    ngOnInit() {
        this.loadShopType();
        this.loadShops();
    }

    /* 获取商家类型 */
    public loadShopType(): void {
        if(this.food_service.shop_types != undefined){
            this.shop_types = this.food_service.shop_types;
            return;
        }

        this.food_service.getShopType()
            .subscribe(
                (data) => {
                    this.shop_types = data;
                    this.food_service.shop_types = data;
                }
            );
    }

    /* 获取所以商家 */
    public loadShops(): void {
        this.is_spinning = true;

        if(!this.location_service.is_changed) {
            if(this.food_service.shops.length != 0) {
                this.shops = this.food_service.shops;
                this.is_spinning = false;

                return;
            }
        }
        

        if(this.location_service.city_id == '' || this.location_service.address == '') {
            if(localStorage.getItem('city_id') != null)
                this.location_service.city_id = localStorage.getItem('city_id');
            
            if(localStorage.getItem('address') != null)
                this.location_service.address = localStorage.getItem('address');
        }
        else {
            localStorage.setItem('city_id', this.location_service.city_id);
            localStorage.setItem('address', this.location_service.address);
        }

        if(this.location_service.city_id == '' || this.location_service.address == '') {
            this.is_spinning = false;
            this.message = '附近无商家';
        }
        else {
            this.food_service.getShops(this.location_service.city_id, this.location_service.address)
                .subscribe(
                    (data) => {
                        this.shops = data;
                        this.food_service.shops = data;

                        this.is_spinning = false;
                        if(this.shops.length == 0)
                            this.message = '附近无商家';
                    },
                    (error) => {
                        console.log(error);
                    }
                );
        }
    }

    /* 选择商店类型 */
    public selectType(id: String): void {
        this.selected_type_id = id;
    }
}