var pagesFunctions = {
    profile: function() {
        function resizeInput() {
            $(this).attr("size", $(this).val().length + 1);
        }
        $('app-profile input[type="text"]')
            // event handler
            .keyup(resizeInput)
            // resize on page load
            .each(resizeInput);
        $("app-profile  .edit-btn").click(() => {
            console.log(222);
            $("input").each(function() {
                console.log($(this));
                resizeInput.bind(this)();
            });
        });
    },
    browse: function() {
        var el = document.querySelector(".duration-range");
        if (el) multirange(el);
    },
    libCard: function() {
        $(document).ready(function() {
            console.log("liba");
            $("lib-card .game-card .delete-btn").click(function() {
                $(this)
                    .parent()
                    .parent()
                    .find(".delete-modal")
                    .modal("show");
            });
            $("lib-card .game-card .show-btn").click(function() {
                $(this)
                    .parent()
                    .parent()
                    .find(".show-modal")
                    .modal("show");
            });
            $("lib-card .game-card .return-btn").click(function() {
                $(this)
                    .parent()
                    .parent()
                    .find(".return-modal")
                    .modal("show");
            });
            $("lib-card .game-card .btn.return").click(function() {
                $(".modal").modal("hide")
            })
        });
    },
    libraryPage: function() {
        $(".pill").click(function() {
            $(this).toggleClass("active");
        });
        $("#new-game-modal #submit-new-game").click(() => {
            $("#new-game-modal").modal("toggle");
        });

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

        setTimeout(() => {
            $("input").on("input", function() {
                var $input = $(this).hasClass("ghost") ? $(".duration-range") : $(this);
                handler(this);
            });
            if ($(".duration-range").length) handler($(".duration-range")[0]);
            console.log("library");
            var el = document.querySelector(".game-modal .duration-range");
            if (el) multirange(el);

            $("input").on("input", function() {
                var $input = $(this).hasClass("ghost") ? $(".duration-range") : $(this);
                handler(this);
            });
            if ($(".duration-range").length) {
                handler($(".duration-range").eq(0))
            }
        }, 200);
    }
};