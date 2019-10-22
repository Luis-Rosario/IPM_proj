import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'library',
  templateUrl: './my-library.component.html',
  styleUrls: ['./my-library.component.css']
})
export class LibraryComponent implements OnInit {

  myGames: any[];
  borrowedGames: any[];


  constructor() { }

  ngOnInit() {
  }

}
