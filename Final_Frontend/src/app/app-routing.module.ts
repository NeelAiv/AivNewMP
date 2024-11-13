import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WidgetsComponent } from './widgets/widgets.component';
import { NewAddedComponent } from './new-added/new-added.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { WidgetPreviewComponent } from './widget-preview/widget-preview.component';
import { UploadWidgetComponent } from './upload-widget/upload-widget.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
import {AuthGuard} from './auth.guard'
import { CreateAccountComponent } from './create-account/create-account.component';
import { RegisterAccountComponent } from './register/register.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { UseTermComponent } from './use-term/use-term.component';
import { ApproveComponent } from './approve/approve.component';



const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeScreenComponent },
  { path: 'register', component: RegisterAccountComponent },
  { path: 'component/:catType/:subCatType', component: WidgetsComponent },
  { path: 'component/:catType', component: WidgetsComponent },
  { path: 'new-added', component: NewAddedComponent },
  { path: 'my-profile', component: MyProfileComponent ,  canActivate: [AuthGuard]},
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'policy', component: PrivacyPolicyComponent },
  { path: 'terms', component: UseTermComponent },

  { path: 'preview/:widgetId', component : WidgetPreviewComponent},
  { path : 'upload', component : UploadWidgetComponent,
   canActivate: [AuthGuard]
},
  { path : 'upload/:widgetId', component : UploadWidgetComponent,  canActivate: [AuthGuard]},
  { path : 'star', component : StarRatingComponent,  canActivate: [AuthGuard]},
  { path: 'widget', loadChildren: () => import('./widget/widget.module').then(m => m.WidgetModule) },
  { path: 'approve', component: ApproveComponent, canActivate: [AuthGuard]}
  // { path: 'widget', loadChildren: './widget/widget.module' },
  //

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
