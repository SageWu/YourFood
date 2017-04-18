import { Component, Inject, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { User } from "./core/model/user.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public user: User;

  constructor(
    @Inject('GlobalService') public global_service,
    @Inject('UserService') public user_service,
    private router: Router) {
  }

  ngOnInit() {
    this.user_service.current_user
      .subscribe(
        (user) => {
          this.user = user;
        }
      );

      if(localStorage.getItem('user_or_saler') != null){
        let type = localStorage.getItem('user_or_saler');

        this.user_service.type = type;
        this.user = JSON.parse(localStorage.getItem(type));
        this.user_service.user = this.user;
      }
  }

  public logout(): void {
    this.user_service.user_stream.next(Object.assign({}));
    this.user = null;
    this.user_service.user = null;
    let type = this.user_service.type;
    this.user_service.type = '';

    localStorage.removeItem(type);
    localStorage.removeItem('user_or_saler');

    this.global_service.navbar_status = false;
    this.router.navigate([type, 'login']);
  }
}
