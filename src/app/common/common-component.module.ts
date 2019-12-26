import { NgModule } from '@angular/core';
import { TopnavComponent } from './topnav/topnav.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule, MatSnackBarModule } from '@angular/material';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    TopnavComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    MatCardModule
  ],
  exports: [
    TopnavComponent
  ]
})
export class CommonComponentModule { }
