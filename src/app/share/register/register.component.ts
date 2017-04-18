import { Component, Inject, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";


declare var md5: any;

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    public type: String;
    public user_form: FormGroup;
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
        this.user_form = this.fb.group({
            'name': ['', Validators.required],
            'phone': ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]],
            'password': ['', Validators.required]
        });

        this.route.data.subscribe(
            (data) => {
                this.type = data.type;
            }
        );
    }

    public register(): void {
        if(!this.user_form.valid){
            return;
        }
        
        let name = this.user_form.controls['name'].value;
        let phone = this.user_form.controls['phone'].value;
        let password = md5(this.user_form.controls['password'].value);
        this.user_service.register(this.type, name, phone, password)
            .subscribe(
                (data) => {
                    if(data.status == '2'){
                        if(this.type == 'user')
                            this.router.navigate(['user', 'login']);
                        else
                            this.router.navigate(['saler', 'login']);
                    }
                    else{
                        this.message = '注册失败，账号已存在';
                    }
                }
            );
    }
}