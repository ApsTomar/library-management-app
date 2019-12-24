import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpRequest,
  HttpHandler, HttpEvent, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../_services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()

export class ErrorInterceptor implements HttpInterceptor {
  private errorMsg: string;
  constructor(
    private authenticationService: AuthenticationService,
    private snackBar: MatSnackBar,
    ) { }

  handleError(error: HttpErrorResponse) {
    console.log(error.message);
    return throwError(error);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(err => {
      if (err.statusText==="Unknown Error"){
        this.errorMsg = "Something went wrong"
      }else {
        this.errorMsg = err.error;
      };
      this.snackBar.open(this.errorMsg,'dismiss',{
        duration: 2000,
        panelClass:'warn'
      })
      if (err.status == 401) {
        this.authenticationService.logout();
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
    }))
  }
}