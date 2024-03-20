import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component
import { LayoutComponent } from './layouts/layout.component';
import { AuthlayoutComponent } from './authlayout/authlayout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { HomeRoutingModule } from './home/home-routing.module';
import { HomeModule } from './home/home.module';
import { VisitorLayoutComponent } from './home/visitor-layout/visitor-layout.component';
import { PostesStageComponent } from './home/postes-stage/postes-stage.component';
import { DescriptionStageComponent } from './home/description-stage/description-stage.component';


const routes: Routes = [
  // { path: '', component: LayoutComponent, loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule), canActivate: [AuthGuard]  },
  // { path: 'auth', component: AuthlayoutComponent, loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: LayoutComponent, loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule), canActivate: [AuthGuard] },
  { path: 'auth', component: AuthlayoutComponent, loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
  { path: 'visitor', component: VisitorLayoutComponent },
  { path: 'Postestage', component: PostesStageComponent },
  { path: 'DescriptionStage', component: DescriptionStageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
