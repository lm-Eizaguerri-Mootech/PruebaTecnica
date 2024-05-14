import { LoginComponent } from './componentes/Login/Login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './componentes/Login/UserList/UserList.component';
import { ModalComponent } from './componentes/modal/modal.component';



const routes: Routes = [
 {path: 'login', component: LoginComponent},
 {path: 'userList', component: UserListComponent},
 {path: 'form', component: ModalComponent},
 { path: '', pathMatch:'full', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
