import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameCardComponent } from './game-card/game-card.component';
import { LibCardComponent } from './lib-card/lib-card.component';




@NgModule({
  declarations: [GameCardComponent, LibCardComponent],
  imports: [
    CommonModule
  ],
  exports: [
    GameCardComponent,
    CommonModule,
    LibCardComponent,
  ]
})
export class SharedModule { }
