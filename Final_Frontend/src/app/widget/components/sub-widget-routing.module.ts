import { Routes, RouterModule } from '@angular/router';
import { SubWidgetComponent } from './sub-widget.component';

 
const routes: Routes = [
  { path: '', component: SubWidgetComponent },
  { path: ':id', component: SubWidgetComponent }
];

export const routing = RouterModule.forChild(routes);