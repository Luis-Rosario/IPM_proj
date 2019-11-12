import { Component, OnInit, Input, OnChanges } from '@angular/core';

declare const onDataChange: any;

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

main(){
  console.log("init",this.games);
  if (this.searchTerm == undefined || this.searchTerm == null)
    this.showResultMessage = false;
  else
    this.showResultMessage = true;

  // console.log(this.games)
}

  ngOnInit() {
    this.main();
    onDataChange(()=>{
      console.log("data change on results")
      this.main();
    });
  }

  ngOnChanges() {
    console.log("change")
    this.ngOnInit();

  }
  

}
