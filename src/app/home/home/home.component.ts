import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(@Inject('GlobalService') public global_service) {
    this.global_service.navbar_status = false;
  }
}
