import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
@Component({
  selector: 'app-price-kwh-dialog',
  templateUrl: './price-kwh-dialog.component.html',
  styleUrls: ['./price-kwh-dialog.component.css'],
})
export class PriceKwhDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<PriceKwhDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  saveOnEnterKey(e, data) {
    if (e.keyCode == 13) {
      this.dialogRef.close(data);
      localStorage.setItem('dataPrice', JSON.stringify(data));
    }
  }

  saveOnClick(e, data) {
    this.dialogRef.close(data);
    localStorage.setItem('dataPrice', JSON.stringify(data));
  }
}
