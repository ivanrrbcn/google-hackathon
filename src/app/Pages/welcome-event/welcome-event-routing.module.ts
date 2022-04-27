import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeEventPage } from './welcome-event.page';

const routes: Routes = [
  {
    path: '',
    component: WelcomeEventPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WelcomeEventPageRoutingModule {}
