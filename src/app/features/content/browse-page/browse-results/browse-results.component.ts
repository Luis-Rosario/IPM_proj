import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'browse-results',
  templateUrl: './browse-results.component.html',
  styleUrls: ['./browse-results.component.scss']
})
export class BrowseResultsComponent implements OnInit, OnChanges {
  @Input() games;
  @Input() searchTerm;

  showResultMessage: any = false;
  constructor() { }

  ngOnInit() {
    if (this.searchTerm == undefined || this.searchTerm == null)
      this.showResultMessage = false;
    else
      this.showResultMessage = true;

    // console.log(this.games)
  }

  ngOnChanges() {
    if (this.searchTerm == undefined || this.searchTerm == null)
      this.showResultMessage = false;
    else
      this.showResultMessage = true;

  }

}
