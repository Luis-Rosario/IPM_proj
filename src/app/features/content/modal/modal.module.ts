import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalRoutingModule } from './modal-routing.module';
import { ModalComponent } from './modal.component';
import { LibraryComponent } from './my-library/my-library.component';
import { InboxComponent } from './inbox/inbox.component';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChatComponent } from './inbox/chat/chat.component';
import { LoanRequestsComponent } from './inbox/loan-requests/loan-requests.component';



@NgModule({
  declarations: [
    ModalComponent,
    LibraryComponent,
    InboxComponent,
    ProfileComponent,
    ChatComponent,
    LoanRequestsComponent,
  ],
  imports: [
    CommonModule,
    ModalRoutingModule,
    SharedModule
  ]
})
export class ModalModule { }
