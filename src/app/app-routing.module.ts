import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoggedInGuard } from './login/logged-in.guard';

const routes: Routes = [
  { 
    path: '',
    canActivate: [LoggedInGuard],
    loadChildren: './features/content/content.module#ContentModule'
   },
  { path: 'login', component: LoginComponent  },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  
})
export class AppRoutingModule { }
