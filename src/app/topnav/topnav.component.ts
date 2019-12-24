import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {
  @Input() mini: boolean;
  title = 'Online Learning Resource';
  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  public logout(){
    this.authenticationService.logout();
  }
}
