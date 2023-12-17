import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { LoginComponent, RegisterComponent, HomeComponent } from '@mean/public';
import { HomeGuard, LoginGuard } from "./guards";
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [HomeGuard]
  },

  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },

  {
    path: 'register',
    component: RegisterComponent
  },

  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})

export class AppRoutingModule {}
