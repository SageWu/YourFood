import { Component, Inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';

/* Style */
import { MdDialog, MdDialogConfig, MdDialogRef } from "@angular/material";
import { ModalDirective } from "ngx-bootstrap/modal";

/* Model */
import { Food } from "../../core/model/food.model";

/* Component */
import { AddDialogComponent } from "../dialog/add-dialog.component";
import { FoodDetailComponent } from "../../share/food-detail/food-detail.component";

@Component({
    selector: 'app-food',
    templateUrl: './food.component.html',
    styleUrls: ['./food.component.css']
})
export class FoodComponent implements AfterViewInit {
    public food_types: Array<Object>;
    public foods: Array<Food>;
    public showed_foods: Array<Food>;
    public current_page: number;

    public opening_dialog: MdDialogRef<AddDialogComponent>;
    public delete_food_id: Number;

    @ViewChild('confirmModal') confirm_modal: ModalDirective;

    constructor(
        @Inject('FoodService') private food_service,
        @Inject('UserService') private user_service,
        private dialog: MdDialog
    ) {
        
    }


    ngAfterViewInit() {
        this.getFoods();
        this.current_page = 1;
    }

    /* 获取餐饮列表 */
    public getFoods(): void {
        if(this.food_service.shop_id == this.user_service.user.id){
            this.food_types = this.food_service.food_types;
            this.foods = this.food_service.foods;
            this.showed_foods = this.foods.slice(0, 10);

            return;
        }

        this.food_service.getFoodAndType(this.user_service.user.id)
            .subscribe(
                (data) => {
                    if(data[0] == null || data[0] == undefined) {
                        this.food_types = new Array<Object>();
                    }
                    else {
                        this.food_types = data[0];
                    }
                    if(data[1] == null || data[0] == undefined) {
                        this.foods = new Array<Food>();
                    }
                    else {
                        this.foods = data[1];
                    }

                    this.food_service.food_types = this.food_types;
                    this.food_service.foods = this.foods;

                    this.showed_foods = this.foods.slice(0, 10);
                },
                (error) => {
                    console.log(error);
                }
            );
        
        this.food_service.shop_id = this.user_service.user.id;
    }

    public openConfirmDialog(food_id: Number): void {
        this.delete_food_id = food_id;
        this.confirm_modal.show();
    }

    /* 删除指定餐饮 */
    public deleteFood(id: Number): void {
        this.food_service.deleteFood(id)
            .subscribe(
                (data) => {
                    let index = this.foods.findIndex(
                        (food: Food) => {
                            if(food.id == id)
                                return true;
                            else
                                return false;
                        }
                    );

                    this.foods.splice(index, 1);

                    this.showed_foods = this.foods.slice(10 * (this.current_page - 1), 10 * this.current_page);
                    this.confirm_modal.hide();
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    /* 打开新建对话框 */
    public openAddDialog(): void {
        this.opening_dialog = this.dialog.open(AddDialogComponent);
        this.opening_dialog.componentInstance.food_types = this.food_types;
        this.opening_dialog.componentInstance.add_or_update = 'add';

        this.opening_dialog.afterClosed().subscribe(
            () => {
                this.showed_foods = this.foods.slice(10 * (this.current_page - 1), 10 * this.current_page);
            }
        )
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

    /* 打开修改对话框 */
    public openUpdateDialog(id: Number): void {
        this.opening_dialog = this.dialog.open(AddDialogComponent);
        this.opening_dialog.componentInstance.food_types = this.food_types;
        this.opening_dialog.componentInstance.food = this.findFood(id);
        this.opening_dialog.componentInstance.add_or_update = 'update';
    }

    /* 打开餐饮详情对话框 */
    public openFoodDetailDialog(id: Number): void {
        let config = new MdDialogConfig();
        config.width = '50%';

        let detail_dialog = this.dialog.open(FoodDetailComponent, config);
        detail_dialog.componentInstance.food = this.findFood(id);
    }

    /* 页码发生变化 */
    public pageChanged(event: any): void {
        this.showed_foods = this.foods.slice(10 * (event.page - 1), 10 * event.page);
    }
}