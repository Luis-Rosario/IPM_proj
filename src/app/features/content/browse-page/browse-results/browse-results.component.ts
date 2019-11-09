import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'browse-results',
  templateUrl: './browse-results.component.html',
  styleUrls: ['./browse-results.component.scss']
})
export class BrowseResultsComponent implements OnInit {
  @Input() games;

  constructor() { }

  ngOnInit() {

    console.log(this.games)
  }

}
