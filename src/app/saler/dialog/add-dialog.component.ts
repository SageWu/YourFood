import { Component, Inject, ViewChild } from '@angular/core';

/* Style */
import { MdDialogRef } from "@angular/material";

/* Model */
import { Food } from "../../core/model/food.model";

@Component({
    selector: 'app-add-dialog',
    templateUrl: './add-dialog.component.html',
    styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent {
    public food_types: Array<Object>
    public food: Food;
    @ViewChild('image') image;

    public message: String;

    public add_or_update: String;

    constructor(
        @Inject('FoodService') private food_service,
        @Inject('UserService') private user_service,
        public dialog_ref: MdDialogRef<AddDialogComponent>
    ){
        this.food = new Food();
        this.food.ftype_id = 1;
    }

    public submit(): void {
        if(this.add_or_update == 'add') {
            this.food_service.addFood('add', this.food, this.image.nativeElement.files[0], this.user_service.user.id)
            .subscribe(
                (data) => {
                    if(data.status == '2') {
                        this.food_service.foods.unshift(data.data);
                        this.dialog_ref.close();
                    }
                    else {
                        this.message = '添加失败';
                    }
                },
                (error) => {
                    console.log(error);
                }
            );
        }
        else {
            this.food_service.addFood('update', this.food, this.image.nativeElement.files[0], this.food.id)
            .subscribe(
                (data) => {
                    if(data.status == '2') {
                        this.dialog_ref.close();
                    }
                    else {
                        this.message = '修改失败';
                    }
                },
                (error) => {
                    console.log(error);
                }
            );
        }
    }

    public cancel(): void {
        this.dialog_ref.close();
    }
 }