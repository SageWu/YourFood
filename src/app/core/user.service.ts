import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { User } from "./model/user.model";

@Injectable()
export class UserService {
    public login_url = 'http://www.sagewu.cn/backend/login.php';
    public register_url = 'http://www.sagewu.cn/backend/register.php';

    // public login_url = 'http://localhost/login.php';
    // public register_url = 'http://localhost/register.php';

    public user_stream: Subject<User>;
    public user: User;
    public type: String;    //用户或商家

    constructor(private http: Http) {
        this.user_stream = new Subject<User>();
    }

    public get current_user() {
        return this.user_stream.asObservable();
    }

    public extractData(response: Response): Object {
        return response.json();
    }

    public handleError(response: Response): ErrorObservable {
        return new ErrorObservable("error: can't get data.");
    }

    public login(type: String, phone: String, password: String): Observable<Object> {
        let url = this.login_url + "?token=" + Math.ceil(Math.random() * 10000).toString();

        let data = new FormData();
        data.append('type', type);
        data.append('phone', phone);
        data.append('password', password);

        this.type = type;

        return this.http.post(url, data)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public register(type: String, name: String, phone: String, password: String): Observable<Object> {
        let url = this.register_url + "?token=" + Math.ceil(Math.random() * 10000).toString();

        let data = new FormData();
        data.append('type', type);
        data.append('name', name);
        data.append('phone', phone);
        data.append('password', password);

        return this.http.post(url, data)
            .map(this.extractData)
            .catch(this.handleError);
    }
}