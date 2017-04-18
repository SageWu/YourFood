import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

/* Style */
import { MdDialog, MdDialogConfig } from "@angular/material";

/* Model */
import { Shop } from '../../core/model/shop.model';
import { Food } from '../../core/model/food.model';

/* Component */
import { FoodDetailComponent } from "../../share/food-detail/food-detail.component";

@Component({
    selector: 'app-saler-detail',
    templateUrl: './saler-detail.component.html',
    styleUrls: ['./saler-detail.component.css']
})
export class SalerDetailComponent implements OnInit {
    public shop: Shop;
    public food_types: Array<Object>;
    public foods: Array<Food>;
    public sort_by: string;

    public show_detail: Boolean;

    public selected_foods: Array<Food>;
    public sum: number;
    public show_cart: Boolean;
    public hidden_min_cart: Boolean;
    @ViewChild('cart') public cart;

    constructor(
        @Inject('GlobalService') private global_service,
        @Inject('FoodService') private food_service,
        private route: ActivatedRoute,
        private dialog: MdDialog
        ) {
        this.global_service.navbar_status = false;

        this.sort_by = 'default';
        this.show_detail = false;

        this.selected_foods = new Array<Food>();
        this.sum = 0;
        this.show_cart = true;
    }

    ngOnInit() {
        this.route.params.subscribe(
            (params) => {
                this.getShop(params['id']);
            }
        );
    }

    /* 获取商店详情 */
    public getShop(id: String): void {
        if(this.food_service.shop_id == id){
            this.shop = this.food_service.shop;
            this.food_types = this.food_service.food_types;
            this.foods = this.food_service.foods;

            return;
        }

        this.food_service.getShop(id)
            .subscribe(
                (data) => {
                    this.shop = data[0];
                    this.food_service.shop = data[0];
                },
                (error) => {
                    console.log(error);
                }
            );

        /* 获取食物类别和食物 */
        this.food_service.getFoodAndType(id)
            .subscribe(
                (data) => {
                    if(data == null)
                    {
                        this.food_service.food_types = null;
                        this.food_service.foods = null;
                        this.food_types = null;
                        this.foods = null;

                        return;
                    }

                    this.food_types = data[0];
                    this.food_service.food_types = data[0];
                    this.foods = data[1];
                    this.food_service.foods = data[1];
                },
                (error) => {
                    console.log(error);
                }
            );

        this.food_service.shop_id = id;
    }

    /* 选择排序类型 */
    public selectSortBy(sort_by: string): void {
        this.sort_by = sort_by;
    }

    /* 选择物品加入购物车 */
    public selectFood(food: Food): void {
        let index = this.selected_foods.findIndex(
            (selected_food) => {
                if(selected_food.id == food.id)
                    return true;
                return false;
            }
        );
        if(index != -1){
            this.selected_foods[index].num++;
        }
        else{
            food.num = 1;
            this.selected_foods.push(food);
        }

        this.sum += parseFloat(food.price);
    }

    public addFood(index: number): void {
        this.selected_foods[index].num++;
        this.sum += parseFloat(this.selected_foods[index].price);
    }

    public reduceFood(index: number): void {
        this.selected_foods[index].num--;
        this.sum -= parseFloat(this.selected_foods[index].price);

        if(this.selected_foods[index].num == 0){
            this.selected_foods.splice(index, 1);
        }
    }

    /* 显示购物车 */
    public showCart(): void {
        this.cart.nativeElement.style.display = 'block';
        this.hidden_min_cart = true;
    }

    /* 隐藏购物车 */
    public hiddenCart(): void {
        if(window.innerWidth < 760){
            this.cart.nativeElement.style.display = 'none';
            this.hidden_min_cart = false;
        }
    }

    /* 查找指定id餐饮 */
    private findFood(id: Number): Food {
        return this.foods.find(
            (food: Food) => {
                if(food.id == id)
                    return true;
                else
                    return false;
            }
        );
    }

    /* 打开餐饮详情对话框 */
    public openFoodDetailDialog(id: Number): void {
        let config = new MdDialogConfig();
        config.width = '50%';

        let detail_dialog = this.dialog.open(FoodDetailComponent, config);
        detail_dialog.componentInstance.food = this.findFood(id);
    }
}