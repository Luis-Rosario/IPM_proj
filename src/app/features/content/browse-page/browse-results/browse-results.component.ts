import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { SessionService } from 'src/app/core/state/session.service';

declare const onDataChange: any;

@Component({
  selector: 'browse-results',
  templateUrl: './browse-results.component.html',
  styleUrls: ['./browse-results.component.scss']
})



export class BrowseResultsComponent implements OnInit, OnChanges {
  @Input() games;
  @Input() searchTerm;

  results: any[] = [];

  showResultMessage: any = false;
  constructor(private sessionService: SessionService) { }

  main() {
    console.log("init", this.games);
    this.results = []
    for(let game in this.games){
      if (this.games[game].user_email != this.sessionService.getLoggedUser())
        this.results.push(this.games[game]);
    }
  
   /*  console.log(this.results) */
    if (this.searchTerm == undefined || this.searchTerm == null)
      this.showResultMessage = false;
    else
      this.showResultMessage = true;

    // console.log(this.games)
  }

  ngOnInit() {
    this.main();
    onDataChange(() => {
      console.log("data change on results")
      this.main();
    });
  }

  ngOnChanges() {
    console.log("change")
    this.ngOnInit();

  }


}
