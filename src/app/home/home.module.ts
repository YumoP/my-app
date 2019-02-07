import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { AuthGuard } from '../auth/shared/auth.guard';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule,MatCheckboxModule,MatInputModule,MatFormFieldModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { ResourseComponent } from './resourse/resourse.component';
import { LoginComponent } from '../auth/login/login.component';
import { SidebarModule } from 'ng-sidebar';
import { HomeService } from './shared/home.service';
import { ProjectComponent } from './project/project.component';
import { FormulaComponent } from './formula/formula.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { TemplateComponent } from './formula/template/template.component';
const routes: Routes = [
  { 
    path:'home', component: HomeComponent,canActivate:[AuthGuard],
    children: [
      { path: '', component: ResourseComponent,canActivate:[AuthGuard]},
      { path: 'resourse', component: ResourseComponent,canActivate:[AuthGuard]},
      { path: 'project', component: ProjectComponent,canActivate:[AuthGuard]},
      { path: 'formula', component: FormulaComponent,canActivate:[AuthGuard]},
      { path: 'template', component: TemplateComponent,canActivate:[AuthGuard]},
      { path: '**', component:LoginComponent,canActivate:[AuthGuard]}
    ]
  }
]
@NgModule({
  declarations: [
      HomeComponent,
      ResourseComponent,
      ProjectComponent,
      FormulaComponent,
      TemplateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatListModule,
    SidebarModule,
    NgbModule,
    FormsModule
  ],
  exports:[
      HomeComponent
  ],
  providers:[
    AuthGuard,
    HomeService
  ]
})
export class HomeModule { }
