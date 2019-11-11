import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'lib-card',
  templateUrl: './lib-card.component.html',
  styleUrls: ['./lib-card.component.scss']
})
export class LibCardComponent implements OnInit {
  @Input() gameName: String;
  @Input() gameInfo: any
  
  constructor() { }

  ngOnInit() {
  }

}
