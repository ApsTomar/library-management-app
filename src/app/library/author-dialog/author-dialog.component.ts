import { Component, OnInit, Inject } from '@angular/core';
import { Author } from 'src/app/models/author-model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-author-dialog',
  templateUrl: './author-dialog.component.html',
  styleUrls: ['./author-dialog.component.css']
})
export class AuthorDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AuthorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Author) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      dob: ['', Validators.required]
    });
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}
