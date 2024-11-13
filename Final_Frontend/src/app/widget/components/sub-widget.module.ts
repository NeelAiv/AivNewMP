import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { routing } from './sub-widget-routing.module';
import { SubWidgetComponent } from './sub-widget.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
  ],
  declarations: [
    SubWidgetComponent,
  ],
  exports: [
  ],
  providers: [

  ]

})
export class SubWidgetModule { }