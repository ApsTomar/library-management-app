import { Component, OnInit } from '@angular/core';
import { AlertService } from '../_services/alert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})

export class AlertsComponent implements OnInit {
  private subscription: Subscription;
  message: any;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.subscription = this.alertService.getAlert()
      .subscribe(message => {
        this.message = message;
      })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
