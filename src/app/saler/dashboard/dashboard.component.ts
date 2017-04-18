import { Component } from '@angular/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
    public chart_data:Array<any> = [
        {data: [656, 599, 800, 812, 565, 555, 666], label: '销售额'},
    ];
    public chart_labels:Array<any> = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
    public chart_options:any = {
        responsive: true
    };
    public chart_colors:Array<any> = [
        {
            backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        }
    ];
    public chart_legend:boolean = true;
    public chart_type:string = 'line';

    constructor() { }
}