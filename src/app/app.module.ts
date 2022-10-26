import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { PriceKwhDialogComponent } from './price-kwh-dialog/price-kwh-dialog.component';
import { AppRoutingModule } from './app.routing.module';
import { FormComponent } from './form/form.component';
import { EndComponent } from './end/end.component';
import { SliderComponent } from './slider/slider.component';
import { SliderTimeComponent } from './slider-time/slider-time.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    AppRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    DragDropModule,
  ],

  declarations: [
    AppComponent,
    //HelloComponent,
    PriceKwhDialogComponent,
    FormComponent,
    EndComponent,
    SliderComponent,
    SliderTimeComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
