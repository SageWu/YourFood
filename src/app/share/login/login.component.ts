import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { Subject } from "rxjs/Subject";

declare var md5: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public type: String;
  public user_form: FormGroup;
  public remember: Boolean;
  public message: String;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    @Inject('UserService') private user_service,
    @Inject('GlobalService') private global_service) {
      this.global_service.saler_center = false;
  }

  ngOnInit() {
    /* 创建动态表单 */
    this.user_form = this.fb.group({
      'phone': ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]],
      'password': ['', Validators.required]
    });

    /* 获取路由数据 */
    this.route.data.subscribe(
      (data) => {
        this.type = data.type;
      }
    );
  }

  /* 记住我 */
  public rememberChange(check): void {
    this.remember = check;
  }

  public login(): void {
    if(!this.user_form.valid){
      return;
    }
    
    let phone = this.user_form.controls['phone'].value;
    let password = md5(this.user_form.controls['password'].value);
    
    this.user_service.login(this.type, phone, password)
      .subscribe(
        (data) => {
            if(data.status == '2'){
              this.user_service.user = data.data[0];
              this.user_service.user_stream.next(data.data[0]);
              this.user_service.type = this.type;

              localStorage.setItem(this.type.toString(), JSON.stringify(data.data[0]));
              localStorage.setItem('user_or_saler', this.type.toString());

              if(this.type == 'user')
                this.router.navigate(['home']);
              else if(this.type == 'saler')
                this.router.navigate(['saler', 'center']);
            }
            else if(data.status == '3'){
              this.message = '密码错误';
            }
            else{
              this.message = '账号不存在';
            }
          },
          (error) => {
            console.log(error);
          }
      );
  }
}
