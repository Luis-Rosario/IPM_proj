import { Component, OnInit } from "@angular/core";
import { SessionService } from "src/app/core/state/session.service";
import { ActivatedRoute } from "@angular/router";
import * as $ from "jquery";

declare const getGames: any;
declare const onDataChange: any;
declare const pagesFunctions: any;
@Component({
  selector: "browse-page",
  templateUrl: "./browse-page.component.html",
  styleUrls: ["./browse-page.component.scss"]
})
export class BrowsePageComponent implements OnInit {
  results: any;
  query: any = null;
  filter: any = {};

  constructor(private _route: ActivatedRoute) {}

  main() {
    console.log("main enter");
    this.JSfilters();

    this._route.queryParams.subscribe(params => {
      this.query = params;
      this.filter = Object.assign({}, this.query);
    });

    this._route.queryParams.subscribe(() => {
      this.getResults();
    });
  }

  ngOnInit() {
    onDataChange(this.main.bind(this));
    pagesFunctions.browse();
    this.main();
    
    //very important function best function ever makes everything work :)
    setInterval(() => {}, 400);
  }

  getResults() {
    console.log(this.filter);
    this.results = getGames(this.filter);
  }

  JSfilters() {
    $(".pill").click(function() {
      $(this).toggleClass("active");
    });

    $(".categories .pill").click(() => {
      this.filter.categories = [];
      for (
        var i = 0;
        i < $(".result-filter .categories .pill.active").length;
        i++
      ) {
        this.filter.categories.push(
          $(".result-filter .categories .pill.active")
            .eq(i)
            .text()
            .toLowerCase()
        );
      }
      console.log(this.filter);
      this.getResults();
    });

    $(".consoles .pill").click(() => {
      this.filter.consoles = [];
      for (
        var i = 0;
        i < $(".result-filter .consoles .pill.active").length;
        i++
      ) {
        this.filter.consoles.push(
          $(".result-filter .consoles .pill.active")
            .eq(i)
            .text()
        );
      }
      console.log(this.filter);
      this.getResults();
    });

    setTimeout(() => {
      //scope fix
      let self = this;
      function handleInput() {
        var $input = $(this).hasClass("ghost") ? $(".year-range") : $(this);
        var val = $input.val();
        if (val.split(",").length > 1) {
          val = val.split(",").map(i => {
            return i - 0;
          });
        } else {
          val -= 0;
        }
        var min = $input.attr("min") - 0;
        var max = $input.attr("max") - 0;
        //console.log(min, val, max);

        if ($(this).hasClass("year-range")) {
          $("label[for='year-min']").text(val[0]);
          $("label[for='year-min']").css(
            "left",
            (100 * (val[0] - min)) / (max - min) + "%"
          );
          $("label[for='year-max']").text(val[1]);
          $("label[for='year-max']").css(
            "left",
            (100 * (val[1] - min)) / (max - min) + "%"
          );
          self.filter.gameYear = val;
          self.getResults();
        }
        if ($(this).hasClass("loan-range")) {
          if (val) $("label[for='loan']").text(val + " weeks");
          else $("label[for='loan']").html("<b>Any</b>");
          $("label[for='loan']").css(
            "left",
            ((val - min) * 100) / (max - min) + "%"
          );
          self.filter.duration = val;
          self.getResults();
        }
        if ($(this).hasClass("distance-range")) {
          if (val) $("label[for='distance']").text(val + "km");
          else $("label[for='distance']").html("<b>Any</b>");
          $("label[for='distance']").css(
            "left",
            ((val - min) * 100) / (max - min) + "%"
          );
          self.filter.distance = val;
          self.getResults();
        }
        //console.log(val);
      }

      $("input").each(handleInput);
      $("input").on("input", handleInput);
    }, 300);
  }
}
