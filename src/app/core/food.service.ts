import { Injectable, Inject } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';

import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Shop } from './model/shop.model';
import { Food } from './model/food.model';

@Injectable()
export class FoodService {
    public shop_type_url = 'http://www.sagewu.cn/backend/shop_type.php';
    public shop_url = 'http://www.sagewu.cn/backend/shops.php';
    public shop_detail_url = 'http://www.sagewu.cn/backend/shop_detail.php';
    public food_and_type_url = 'http://www.sagewu.cn/backend/food_and_type.php';
    public modify_food_url = 'http://www.sagewu.cn/backend/modify_food.php';

    // public shop_type_url = 'http://localhost/shop_type.php';
    // public shop_url = 'http://localhost/shops.php';
    // public shop_detail_url = 'http://localhost/shop_detail.php';
    // public food_and_type_url = 'http://localhost/food_and_type.php';
    // public modify_food_url = 'http://localhost/modify_food.php';

    /* 缓存信息 */
    public shop_types: Array<Object>;
    public shops:Array<Shop>;
    public shop_id: String;
    public shop: Shop;
    public food_types: Array<Object>;
    public foods: Array<Food>;
    
    constructor(private http: Http) {
        this.shops = new Array<Shop>();
    }

    public extractData(response: Response): Object[] {        
        return response.json().data;
    }

    public handleError(response: Response): ErrorObservable {
        return new ErrorObservable("error: can't get data.");
    }

    /* 获取商店类别 */
    public getShopType(): Observable<Object[]> {
        let params = new URLSearchParams();
        params.set('token', Math.ceil(Math.random() * 10000).toString());

        return this.http.get(this.shop_type_url, { search: params })
            .map(this.extractData)
            .catch(this.handleError);
    }

    /* 获取商店 */
    public getShops(city_id: String, address_content: String): Observable<Object[]> {
        let params = new URLSearchParams();
        params.set('city_id', city_id.toString());
        params.set('address_content', address_content.toString());

        return this.http.get(this.shop_url, { search: params })
            .map(this.extractData)
            .catch(this.handleError);
    }

    /* 获取商店详情 */
    public getShop(shop_id: String): Observable<Object[]> {
        let params = new URLSearchParams();
        params.set('shop_id', shop_id.toString());

        return this.http.get(this.shop_detail_url, { search: params })
            .map(this.extractData)
            .catch(this.handleError);
    }

    /* 获取餐饮及类别 */
    public getFoodAndType(shop_id: String): Observable<Object[]> {
        let params = new URLSearchParams();
        params.set('shop_id', shop_id.toString());

        return this.http.get(this.food_and_type_url, { search: params })
            .map(this.extractData)
            .catch(this.handleError);
    }

    /* 删除餐饮 */
    public deleteFood(id: Number): Observable<Object> {
        let url = this.modify_food_url + "?token=" + Math.ceil(Math.random() * 10000).toString();

        let data = new FormData();
        data.append('action', 'delete');
        data.append('id', id);

        return this.http.post(url, data)
            .map(
                (response: Response) => {
                    return response.json();
                }
            )
            .catch(this.handleError);
    }

    /* 添加餐饮 */
    public addFood(add_or_update: String, food: Food, image: any, id: Number): Observable<Object> {
        let url = this.modify_food_url + "?token=" + Math.ceil(Math.random() * 10000).toString();

        let data = new FormData();
        data.append('action', add_or_update);
        data.append('name', food.name);
        data.append('desc', food.desc);
        data.append('price', food.price);
        data.append('image', image);
        data.append('ftype_id', food.ftype_id);
        data.append('id', id);

        return this.http.post(url, data)
            .map(
                (response: Response) => {
                    return response.json();
                }
            )
            .catch(this.handleError);
    }
}