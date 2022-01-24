import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AddUserComponent } from './components/add-user/add-user.component'
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { LoginComponent } from './components/login/login.component'
import { UpdateUserComponent } from './components/update-user/update-user.component'
import { HomeComponent } from './components/home/home.component'
import { AuthGuard } from './guards/auth.guard'
import { AuthNormalUserGuard } from './guards/auth-normal-user.guard'
import { LoginUserComponent } from './components/login-user/login-user.component'

const routes: Routes = [
  { path: '', redirectTo: "login", pathMatch: 'full' },
  { path: 'loginAdmin', component: LoginComponent },
  { path: 'login', component: LoginUserComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'create', component: AddUserComponent, canActivate: [AuthGuard] },
  { path: 'update/:id', component: UpdateUserComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthNormalUserGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
