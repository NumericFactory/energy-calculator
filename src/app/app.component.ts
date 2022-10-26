import { Component, VERSION } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { ItemsService } from './items.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { PriceKwhDialogComponent } from './price-kwh-dialog/price-kwh-dialog.component';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Reactive Forms avec Angular';
  // [nombre d'heures d'utilisation / j]  x [nombre jours d'utilisation] x ([puissance appareil en watts] / 1000) = nombre kWh
  // prix  =  nombre kWh * prix au kwh (0.11-0.14)
}
