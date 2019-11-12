import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/core/state/session.service';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';

declare const getGames: any;
declare const onDataChange: any;

@Component({
  selector: 'browse-page',
  templateUrl: './browse-page.component.html',
  styleUrls: ['./browse-page.component.scss']
})
export class BrowsePageComponent implements OnInit {

  results: any;
  query: any = null;
  filter: any = {};

  constructor(
   
    private _route: ActivatedRoute
  ) { }

  main(){
    console.log("main enter")
    this.JSfilters()
  
    this._route.queryParams.subscribe(params => {
      this.query = params;
      this.filter = Object.assign({},this.query)
    })
    
    this._route.queryParams.subscribe(()=>{
      this.getResults();
    })
  }

  ngOnInit() {
    onDataChange(this.main.bind(this))
    this.main();

    //very important function best function ever makes everything work :)
    setInterval(()=>{},400);
  }

  getResults() {
    this.results = getGames(this.filter);
  }

  JSfilters(){
    $(".pill").click(function() {
      $(this).toggleClass("active");
    });
      
    $(".categories .pill").click(()=>{
      this.filter.categories = []
      for(var i=0;i<$(".categories .pill.active").length;i++){

        this.filter.categories.push( $(".categories .pill.active").eq(i).text().toLowerCase())
      }
      console.log(this.filter)
      this.getResults();
    })

    $(".consoles .pill").click(()=>{
      this.filter.consoles = []
      for(var i=0;i<$(".consoles .pill.active").length;i++){

        this.filter.consoles.push( $(".consoles .pill.active").eq(i).text())
      }
      console.log(this.filter)
      this.getResults();
    })
    
    
    setTimeout(()=>{$("input").on("input",function(){
      var $input = $(this).hasClass("ghost") ? $(".year-range") : $(this)
      var val = $input.val();
      if(val.split(",").length>1){
        val = val.split(",").map(i=>{return i-0;})
      } else{
        val -= 0;
      }
      var min = $input.attr("min")-0;
      var max = $input.attr("max")-0;
      console.log(min,val,max)
      
      if($(this).hasClass("year-range")){
        $("label[for='year-min']").text(val[0])
        $("label[for='year-min']").css("left",(100*(val[0]-min)/(max-min))+"%")
        $("label[for='year-max']").text(val[1])
        $("label[for='year-max']").css("left",(100*(val[1]-min)/(max-min))+"%")
      }
      if($(this).hasClass("loan-range")){
        $("label[for='loan']").text(val+" weeks")
        $("label[for='loan']").css("left",((val-min)*100/(max-min))+"%")
      }
      if($(this).hasClass("distance-range")){
        $("label[for='distance']").text(val + "km")
        $("label[for='distance']").css("left",((val-min)*100/(max-min))+"%")
      }
      console.log(val);
    })},300)
  }
}


