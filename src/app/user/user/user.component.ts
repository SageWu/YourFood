import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  constructor(@Inject('GlobalService') public global_service) {
    this.global_service.navbar_status = false;
  }
}
