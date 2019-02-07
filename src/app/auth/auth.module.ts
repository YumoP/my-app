import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './shared/auth.service';
import { AuthGuard} from './shared/auth.guard';
import { SidebarModule } from 'ng-sidebar';
import { TokenInterceptor } from './shared/token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

const routes: Routes = [
    { path:'', component:LoginComponent },
    { path:'register', component: RegisterComponent}, 
    { path:'login', component: LoginComponent}
]
@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SidebarModule
  ],
  exports:[
      AuthComponent
  ],
  providers: [
    AuthService, 
    AuthGuard
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptor,
    //   multi: true
    // }
  ]
})
export class AuthModule { }
