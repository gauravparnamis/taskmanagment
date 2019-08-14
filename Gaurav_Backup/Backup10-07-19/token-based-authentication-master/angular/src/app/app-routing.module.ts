import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainDeskComponent } from './main-desk/main-desk.component';
import { RegisterComponent } from './register/register.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { ForgetmailComponent } from './forgetmail/forgetmail.component';
import { ResetComponent } from './reset/reset.component';
import { AdminComponent } from './admin/admin.component';
import { FormComponent } from './admin/form/form.component';
import { TaskcreationComponent } from './admin/taskcreation/taskcreation.component';
import { PageNotFoundComponent } from '../app/page-not-found/page-not-found.component';
import { AuthGuard } from './auth/auth-guard.service';


const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },

  {
    
    path: 'main', component: MainDeskComponent, children:
      [
        {path: '', redirectTo: 'login', pathMatch: 'full'},
        { path: 'login', component: LoginComponent },
        { path: 'register', component: RegisterComponent},
        { path: 'forgot',component: ForgetmailComponent},
        { path: 'reset/:id/:token',component: ResetComponent},
        { path: '**', component: PageNotFoundComponent},

      ]
  },
  {path: 'dash' , component: UserDashboardComponent},
  {path: 'admin' , component: AdminComponent},
  {path: 'newuser',component: FormComponent, canActivate: [AuthGuard] },
  {path: 'taskCreation', component: TaskcreationComponent, canActivate: [AuthGuard]},
  { path: '**', component: PageNotFoundComponent},





];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
