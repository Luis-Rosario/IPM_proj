var pagesFunctions = {
  libraryPage: function() {
    console.log("library");
    var el = document.querySelector(".game-modal .duration-range");
    multirange(el);

    setTimeout(() => {
      $("input").on("input", function() {
        var $input = $(this).hasClass("ghost") ? $(".duration-range") : $(this);
        handler(this);
      });
      handler($(".duration-range").eq(0));
      function handler(th) {
        var $input = $(th).hasClass("ghost") ? $(".duration-range") : $(th);
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
        console.log(min, val, max);

        if ($(th).hasClass("duration-range")) {
          $("label[for='duration-min']").text(
            val[0] + (val[0] == 1 ? " week" : " weeks")
          );
          $("label[for='duration-min']").css(
            "left",
            (100 * (val[0] - min)) / (max - min) + "%"
          );
          $("label[for='duration-max']").text(
            val[1] + (val[1] == 1 ? " week" : " weeks")
          );
          $("label[for='duration-max']").css(
            "left",
            (100 * (val[1] - min)) / (max - min) + "%"
          );
        }
      }
    }, 800);
  }
};
