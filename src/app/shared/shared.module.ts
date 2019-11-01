import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameCardComponent } from './game-card/game-card.component';



@NgModule({
  declarations: [GameCardComponent],
  imports: [
    CommonModule
  ],
  exports: [
    GameCardComponent,
    CommonModule,
  ]
})
export class SharedModule { }
