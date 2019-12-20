import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {
  @Input() mini: boolean;
  title = 'Online Learning Resource';
  constructor() { }

  ngOnInit() {
    console.log(this.mini)
  }

}
