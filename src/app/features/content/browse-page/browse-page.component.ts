import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'browse-page',
  templateUrl: './browse-page.component.html',
  styleUrls: ['./browse-page.component.scss']
})
export class BrowsePageComponent implements OnInit {


  results: any[];
  constructor() { }

  ngOnInit() {
  }

}
