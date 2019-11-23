import { Component, OnInit } from "@angular/core";
import { SessionQuery } from "src/app/core/state/session.query";

//declare const $: any;

declare const getGamesLending: any;
declare const getAcceptedGamesBorrowing: any;
declare const pagesFunctions: any;
declare const addGame: any;
declare const getConsoles: any;
declare const getCategories: any;
declare const onDataChange: any;
declare const orderedGamesBorrowing: any;
declare const orderedGamesLending: any;
declare const $: any;
declare const getGameData: any;

declare const showToast: any;

declare const json: any;

@Component({
  selector: "library",
  templateUrl: "./my-library.component.html",
  styleUrls: ["./my-library.component.scss"]
})
export class LibraryComponent implements OnInit {
  lendingGamesInfo: Map<String, any> = new Map();
  lendingGames: String[] = [];

  borrowingGamesInfo: Map<String, any> = new Map();
  borrowingGames: String[] = [];
  gameNames: String[] = [];

  user: any;
  consoles: any[] = [];
  categories: any[] = [];
  consoleHTMLBackup: String = "";
  autocompleted: boolean = false;


  constructor(private sessionQuery: SessionQuery) { }

  clearDropDown() {
    let str = ""
    let consoles = getConsoles();
    for (let i = 0; i < consoles.length; i++) {
      let console_ = consoles[i];
      str += " <option value=" + console_.replace(/ /g, "") + ">" + console_ + "</option>";
    }
    $("#new-game-modal .select-console select").html(str);
    $(".selectpicker").selectpicker("refresh");
  }

  fillGameInfo(gameInfo) {
    this.autocompleted = true;
    console.log("autotrue")
    console.log(gameInfo)
    $("#new-game-modal .categories .pill").removeClass("active");
    //fill year
    $("#new-game-modal #year").val(gameInfo.year)
    //fill categories
    gameInfo.category.forEach(cat => {
      $("#new-game-modal .categories .pill").each(function () {
        if ($(this).text().trim().toLowerCase() == cat.trim().toLowerCase())
          $(this).addClass("active");
      })
    })
    //select console
    this.clearDropDown();
    setTimeout(() => {
      console.log(window["aa"] = gameInfo.console, window["bb"] = this.consoles);
      let excluded = this.consoles.filter((c) => { return !gameInfo.console.includes(c) })
      console.log(excluded);
      excluded.forEach(e => {
        let clist = Array.from(document.querySelectorAll("#new-game-modal .select-console option")).filter((c) => {
          return $(c).text() == e;
        });
        $(clist).remove();
        console.log(clist);
        //$('#new-game-modal .select-console').find('[value="' + ee + '"]').remove();
        console.log(e);
      })
      setTimeout(() => {
        $(".selectpicker").selectpicker("refresh")
      }, 100);
    }, 100);
    //select img
    $("#new-game-modal #image").show();
    $("#new-game-modal #image").attr("src", gameInfo.image_url)
    $("#new-game-modal #image").removeClass("hidden");
  }

  main() {
    this.user = this.sessionQuery.getValue().email;
    this.getLendingGames();
    this.getBorrowingGames();
    this.consoles = getConsoles();
    this.categories = getCategories();
    pagesFunctions.libraryPage();
    pagesFunctions.libCard();

    setTimeout(() => {
      $(".selectpicker").selectpicker()
    }, 300);

    let self = this;
    $("#new-game-modal input#name").on('input', function () {
      var userText = $(this).val();
      console.log(userText);
      $("#new-game-modal #games-list").find("option").each(function () {
        if ($(this).val() == userText) {
          setTimeout(() => {
            self.fillGameInfo(getGameData(userText));
          }, 200);
        } else {
          if (self.autocompleted) {
            console.log("clear ti");
            setTimeout(() => {
              $("#new-game-modal #image").hide();
              $("#new-game-modal #image").addClass("hidden");
              $("#new-game-modal #image").attr("src", null)
              self.clearDropDown();
            }, 400)

          }
          console.log("autofalse")
          self.autocompleted = false;

        }
      })
    })
  }

  ngOnInit() {
    onDataChange(this.main.bind(this));
    setInterval(() => { }, 400);
    this.main();

    this.gameNames = json.game_db.map((obj) => {
      return obj.name;
    })
  }

  getLendingGames() {
    let game;
    let myGamesJSON = orderedGamesLending(this.user);
    let index = 0;
    let keys = Object.keys(myGamesJSON);

    for (game of keys) {
      this.lendingGames[index] = game;
      this.lendingGamesInfo.set(game, myGamesJSON[game]);
      /* console.log(this.lendingGames) */
      index++;
    }
  }

  getBorrowingGames() {
    let game;
    let myBorrowedGamesJSON = orderedGamesBorrowing(this.user);
    let index = 0;
    let keys = Object.keys(myBorrowedGamesJSON);

    for (game of keys) {
      this.borrowingGames[index] = game;
      this.borrowingGamesInfo.set(game, myBorrowedGamesJSON[game]);

      index++;
    }
  }

  isAvailable(game) {
    //console.log(this.lendingGamesInfo.get(game))
    return this.lendingGamesInfo.get(game).active;
  }

  addGame() {
    let name = (<HTMLInputElement>document.getElementById("name")).value;
    let year = (<HTMLInputElement>document.getElementById("year")).value;
    let categories = [];
    console.log(this.isFormValid())

    if (this.isFormValid()) {
      console.log("E")
      for (var i = 0; i < $("#new-game-modal .pill.active").length; i++) {
        var el = $("#new-game-modal .pill.active")
          .eq(i)
          .text();
        categories.push(el);
      }

      var platform = $("#new-game-modal .select-console select option:selected").text();
      var range = $("#new-game-modal .duration-range")
        .val()
        .split(",");
      range[0] -= 0;
      range[1] -= 0;

      var jsonGame = {
        user_email: this.user,
        game_name: name,
        year: year,
        category: categories,
        console: platform,
        image_url: $("#new-game-modal #image.hidden").length ? "assets/llamma.png" : $("#new-game-modal #image").attr("src"),
        duration_range: range,
        active: true,
        warned: false,
        endDate: ""
      };
      addGame(this.user, jsonGame);
      console.log(platform);

      $("#new-game-modal").modal("toggle");

      this.ngOnInit();
      showToast("Game successfully added!")
    }

  }

  handleChange() {
    this.lendingGames = [];
    this.ngOnInit();
  }

  isFormValid() {
    $(".error-message").addClass("hidden");

    let game_name = (<HTMLInputElement>(document.querySelector(".game-name"))).validity.valid;
    let year = (<HTMLInputElement>(document.querySelector("#year"))).validity.valid;

    if (!game_name) {
      $(document.querySelector(".game-name").parentElement).find(".error-message").removeClass("hidden")
    }

    if (!year) {
      $(document.querySelector("#year").parentElement).find(".error-message").removeClass("hidden")
    }


    return year && game_name
  }

  hiddeErrorMessages() {
    console.log("S")
    $(".error-message").addClass("hidden");
  }
}
