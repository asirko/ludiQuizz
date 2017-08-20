import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AdminComponent } from './admin/admin.component';
import { ScreenComponent } from './screen/screen.component';
import { PlayerComponent } from './player/player.component';

const routes: Routes = [{
  path: '',
  component: PlayerComponent
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
