import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { WidgetComponent } from './widget.component';

export  const FormsRoutes: Routes = [
  {
    path : '', component : WidgetComponent,
      children : [
        // { path: 'sub-widget', loadChildren: () => import('./components/sub-widget/sub-widget.module').then(m => m.SubWidgetModule) },
        { path: 'sub-widget', loadChildren: () => import('./components/sub-widget.module').then(m => m.SubWidgetModule) },

      ]
  }
];

export const routing : ModuleWithProviders<any> = RouterModule.forChild(FormsRoutes);
