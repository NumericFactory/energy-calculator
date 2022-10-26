import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormComponent } from './form/form.component';
import { EndComponent } from './end/end.component';

@NgModule({
  // declarations: [FormComponent, EndComponent],
  imports: [
    RouterModule.forRoot([
      { path: '', component: FormComponent },
      { path: 'end', component: EndComponent },
    ]),
  ],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
