import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalRoutingModule } from './modal-routing.module';
import { ModalComponent } from './modal.component';
import { LibraryComponent } from './my-library/my-library.component';
import { InboxComponent } from './inbox/inbox.component';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [
    ModalComponent,
    LibraryComponent,
    InboxComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    ModalRoutingModule
  ]
})
export class ModalModule { }
