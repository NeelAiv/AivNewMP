import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing } from './widget-routing.module';
import { WidgetComponent } from './widget.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    WidgetComponent,
  ],
  imports: [
    BrowserModule,
    routing,
    CommonModule
  ],
  providers: [
    ],
  
})
export class WidgetModule {}
