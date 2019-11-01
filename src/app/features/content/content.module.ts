import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentRoutingModule } from './content-routing.module';
import { MainPageComponent } from './main-page/main-page.component';
import { BrowsePageComponent } from './browse-page/browse-page.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    MainPageComponent,
    BrowsePageComponent
  ],
  imports: [
    CommonModule,
    ContentRoutingModule,
    SharedModule,
  ]
})
export class ContentModule { }
