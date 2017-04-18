import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, Headers } from '@angular/http';

import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { City } from './model/city.model';

@Injectable()
export class LocationService {
    public city_url = 'http://www.sagewu.cn/backend/city.php';
    public address_url = 'http://www.sagewu.cn/backend/address.php';
    public city_id_url = 'http://www.sagewu.cn/backend/city_id.php';

    // public city_url = 'http://localhost/city.php';
    // public address_url = 'http://localhost/address.php';
    // public city_id_url = 'http://localhost/city_id.php';

    public city_id: String;
    public address: String;
    public is_changed: Boolean;

    constructor(private http: Http) {
        this.city_id = '';
        this.address = '';
        this.is_changed = false;
    }

    public extractData(response: Response): Object[] {
        return response.json().data;
    }

    public handleError(response: Response): ErrorObservable {
        return new ErrorObservable("error: can't get data.");
    }

    public getCity(): Observable<City[]> {
        let params = new URLSearchParams();
        params.set('token', Math.ceil(Math.random() * 10000).toString());

        return this.http.get(this.city_url, { search: params })
            .map(this.extractData)
            .catch(this.handleError);
    }

    public getCityId(city: String): Observable<Object[]> {
        let params = new URLSearchParams();
        params.set('city_content', city.toString());

        return this.http.get(this.city_id_url, { search: params })
            .map(this.extractData)
            .catch(this.handleError);
    }

    public getAddress(city_id: String, search: String): Observable<Object[]> {
        let params = new URLSearchParams();
        params.set('city_id', city_id.toString());
        params.set('address_content', search.toString());

        return this.http.get(this.address_url, { search: params })
            .map(this.extractData)
            .catch(this.handleError);
    }
}