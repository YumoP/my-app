import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  private _opened: boolean = false;
  private _toggleSidebar() {
    this._opened = !this._opened;
  }
  loginForm: FormGroup;
  errors:any[] = [];
  
  notifyMessage: String;
  constructor(private router:Router, private fb:FormBuilder, private service:AuthService, private activeRoute: ActivatedRoute) { }

  login(){
    this.service.login(this.loginForm.value).subscribe(
      ()=>{
        this.router.navigate(['/home']);
      },
      (errorResponse)=>{
        console.log(errorResponse.error.errors);
        this.errors = errorResponse.error.errors;
      }
    );
  }
  initForm(){
    this.loginForm = this.fb.group({
      email:['', [Validators.required, Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
      password:['', [Validators.required]]
    })
  }
  isInvalidForm(fieldname):boolean{
    return this.loginForm.controls[fieldname].invalid && 
      (this.loginForm.controls[fieldname].dirty || this.loginForm.controls[fieldname].touched);
  }
  ngOnInit() { 
    this.initForm();
    this.activeRoute.params.subscribe(
      (params)=>{
        if(params['registered'] === 'success'){
          this.notifyMessage="Register successful, you can login now!"
        }
      }
    );
  }
}
