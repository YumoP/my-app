import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../auth/shared/auth.service';
import { HomeService } from '../../home/shared/home.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  projectNumber:string;
  constructor(private service:AuthService, private homeService:HomeService) { }

  ngOnInit() {
    this.homeService.currentProject.subscribe(project => this.projectNumber = project);
    console.log(this.projectNumber);
  }
  logout(){
    this.service.logout();
    this.homeService.passProjectNumber(null);
  }
}
