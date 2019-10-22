import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LibraryComponent } from './my-library/my-library.component';
import { InboxComponent } from './inbox/inbox.component';
import { ModalComponent } from './modal.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [{
  path: '',
  component: ModalComponent, 
  children:[{ 
    path: 'profile', component: ProfileComponent,
  },{
    path: 'inbox', component: InboxComponent,
  },{
    path: 'library', component: LibraryComponent,
   }]} 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModalRoutingModule { }
