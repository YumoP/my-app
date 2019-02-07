import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {  
  private _opened: boolean = false;
  private _toggleSidebar() {
    this._opened = !this._opened;
  }
  regForm: FormGroup;
  errors: any[] = [];
  constructor(private router: Router, private fb: FormBuilder, private service:AuthService) {
  }
  initForm(){
    this.regForm = this.fb.group({
      username:["", Validators.required],
      email:["", [Validators.required, Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
      password:["", Validators.required],
      passwordConfirmation:["", Validators.required]
    });
  }
  
  register(){
    this.service.register(this.regForm.value).subscribe(
      ()=>{
        this.router.navigate(['/login',{registered:"success"}]);
      },
      (errorResponse)=>{
        console.log(this.regForm.value);
        this.errors = errorResponse.error.errors;
      }
    );
  }
  ngOnInit() {
    this.initForm();
  }

}
