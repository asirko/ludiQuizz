
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { NgModule } from '@angular/core';
import { ScreenComponent } from './screen/screen.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';

const routes: Routes = [{
  path: '',
  component: UtilisateurComponent
}, {
  path: 'admin',
  component: AdminComponent
}, {
  path: 'screen',
  component: ScreenComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
