import { Component, OnInit, ViewChild, Inject, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switch';

/* Style directive */
import { ModalDirective } from 'ngx-bootstrap/modal';
import { BsDropdownDirective } from 'ngx-bootstrap/dropdown';

/* Model */
declare var AMap: any;
import { City } from '../../core/model/city.model';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit, AfterViewInit {
  public is_modal_show: Boolean = false;
  @ViewChild('modal') public modal:ModalDirective;

  public map;
  public city_search;
  public my_city: City;
  public cities: Array<Object>;

  public search_streamr: Subject<String>;
  public my_address: String;
  public addresses: Array<String>;
  public show_addresses: Boolean;

  constructor(@Inject('LocationService') private location_service, private router: Router) {
    this.my_city = new City(0, '', '');

    this.search_streamr = new Subject<String>();
    this.my_address = '';
    this.show_addresses = true;
  }

  ngOnInit() {
    /* 获取城市 */
    this.getCities();


    /* 订阅查询地址字符串流 */
    this.search_streamr
      .debounceTime(200)
      .distinctUntilChanged()
      .map(
        (search_text) => {
          if(search_text != "")
          {
            return this.location_service.getAddress(this.my_city.id, search_text);
          }
          else
          {
            return new Array<Object>();
          }
        }
      )
      .switch()
      .subscribe(
        (data) => {
          this.addresses = null;
          this.addresses = new Array<String>();

          if(data == undefined || data == null) {
            this.addresses.push('无匹配结果');
          }
          else {
            data.map(
              (address) => {
                this.addresses.push(address["value"]);
              }
            );
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  ngAfterViewInit() {
    /* 初始化定位组件 */
    //this.initMap();
  }

  /* 获取城市 */
  public getCities(): void {
    this.location_service.getCity().subscribe(
      (data) => {
        let i = 0;
        let j = 0;
        
        this.cities = null;
        this.cities = new Array<Object>();
        this.cities.push(new Object());
        this.cities[i]['key'] = data[0].first;
        this.cities[i]['values'] = new Array<City>();
        
        data.forEach(city => {
          if(this.cities[i]['key'] != city.first)
          {
            i++;

            this.cities.push(new Object());
            this.cities[i]['key'] = city.first;
            this.cities[i]['values'] = new Array<City>();

            j = 0;
          }
          
          this.cities[i]['values'].push(city);
          j++;
        });        
      },
      (error) => {
        console.log(error);
      }
    );
  }

  private initMap(): void {
    this.map = new AMap.Map('container');
    this.map.plugin('AMap.CitySearch', this.getCitySearch.bind(this));
  }

  /* 开始定位 */
  public showModal(): void {
    if(!this.map)
    {
      this.map = new AMap.Map('container');
      this.map.plugin('AMap.CitySearch', this.getCitySearch.bind(this));
    }

    if(this.city_search == undefined)
      return;
    
    this.city_search.getLocalCity(this.onComplete.bind(this));
  }

  /* 获得定位插件 */
  public getCitySearch () {
    this.city_search = new AMap.CitySearch();
  }

  /* 定位完成 */
  public onComplete(status: String, result) {
    if(status == 'complete')
    {
      this.my_city['value'] = result['city'];
      this.location_service.getCityId(result['city']).subscribe(
        (data) => {
          this.my_city['id'] = data[0]['id'];
        },
        (error) => {
          console.log(error);
        }
      );

      this.is_modal_show = true;  //成功获取城市后显示dialog
    }
    else
      console.log('定位失败');
  }

  /* 当dialog隐藏时 */
  public onHidden(): void {
    this.is_modal_show = false;
  }

  /* 隐藏dialog */
  public hiddenModal(): void {
    this.modal.hide();
  }

  /* 选择城市 */
  public selectCity(city: City): void {
    this.my_city = city;
  }

  /* 搜索地址 */
  public searchAddress(): void {
    this.search_streamr.next(this.my_address);
  }

  /* 选择地址 */
  public selectAddress(str: String): void {
    this.my_address = str;
    this.show_addresses = false;
  }

  /* 完成定位 */
  public finishLocation(): void {
    if(this.location_service.city_id != this.my_city.id || this.location_service.address != this.my_address) {
      this.location_service.is_changed = true;
    }
    else {
      this.location_service.is_changed = false;
    }

    this.location_service.city_id = this.my_city.id;
    this.location_service.address = this.my_address;

    this.router.navigate(['place']);
  }
}
