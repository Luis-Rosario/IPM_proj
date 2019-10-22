import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPageComponent } from './main-page/main-page.component';
import { BrowsePageComponent } from './browse-page/browse-page.component';

const routes: Routes = [
  {
    path: 'home', component: MainPageComponent,
  },
  {
    path: 'browse', component: BrowsePageComponent,
  },
  { 
    path: 'user', loadChildren: './modal/modal.module#ModalModule',
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
