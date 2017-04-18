import { Component, Inject, OnInit } from '@angular/core';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
    public is_mobile: Boolean;

    constructor(@Inject('GlobalService') private global_service) {
        this.global_service.navbar_status = true;
    }

    ngOnInit() {
        if(window.innerWidth < 768)
            this.is_mobile = true;
        else
            this.is_mobile = false;
    }
}