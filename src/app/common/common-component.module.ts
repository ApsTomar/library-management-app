import { NgModule } from '@angular/core';
import { TopnavComponent } from './topnav/topnav.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule, MatSnackBarModule } from '@angular/material';

@NgModule({
  declarations: [
    TopnavComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    MatCardModule
  ]
})
export class CommonComponentModule { }
