import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentRoutingModule } from './content-routing.module';
import { MainPageComponent } from './main-page/main-page.component';
import { BrowsePageComponent } from './browse-page/browse-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowseResultsComponent } from './browse-page/browse-results/browse-results.component';


@NgModule({
  declarations: [
    MainPageComponent,
    BrowsePageComponent,
    BrowseResultsComponent
  ],
  imports: [
    CommonModule,
    ContentRoutingModule,
    SharedModule,
  ]
})
export class ContentModule { }
