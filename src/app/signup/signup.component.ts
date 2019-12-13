import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../_services/authentication.service';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() {
    return this.signupForm.controls;
  }

  onSubmit() {
    this.submitted = true // Missing Semicolon
    if (this.signupForm.invalid) {
      console.log(this.submitted);
      // NO Console logs or debuggers
      this.loading = false;
      return;
    }
    this.loading = true;

    this.authenticationService.signup(this.f.name.value, this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
          this.loading = false;
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
