// array of buttons
var gifs = ["cat", "dog", "fox", "hedgehog", "otter", "axolotl", "puffin"];
    
// link to giphy and apikey 
    function displayGifs() {
        var gif = $(this).attr("data-gif");
        var queryUrl = "https://api.giphy.com/v1/gifs/search?q="
        + gif + "&rating=pg-13&limit=10&api_key=foTalqeEWNKyibpH7GzCv97LKZLXgUCL";

        // ajax call 
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function(response) {
            console.log(queryUrl);
            console.log(response);

            var results = response.data;

            for (var i = 0; i< results.length; i++) {

                var gifDiv = $("<div class='gif'>");

                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_still.url);
                gifImage.attr("data-still", results[i].images.fixed_height_still.url);
                gifImage.attr("data-animate", results[i].images.fixed_height.url);
                gifImage.attr("data-state", "still");

                var p = $("<p>").text("Rating: " + results[i].rating);
                
                gifDiv.append(gifImage);
                gifDiv.append(p);

            

                $("#gifs-view").prepend(gifDiv)
            } 
            
        });
    }

    function animateGif() {
        
        var state = $(this).find("img").attr("data-state");
        
        if (state === "still") {
          $(this).find("img").attr("src", $(this).find("img").attr("data-animate"));
          $(this).find("img").attr("data-state", "animate");
        } else {
          $(this).find("img").attr("src", $(this).find("img").attr("data-still"));
          $(this).find("img").attr("data-state", "still");
        }
      };

    function renderButtons() {
        $("#buttons-view").empty();

        for (var i = 0; i < gifs.length; i++) {
            var a = $("<button>");

            a.addClass("gif-btn");
            a.attr("data-gif", gifs[i]);
            a.text(gifs[i]);

            $("#buttons-view").append(a);
        }
    }

    $("#add-gif").on("click", function(event) {
        event.preventDefault();

        var gif = $("#gif-input").val();

        gifs.push(gif);
        $("#gif-input").val("");
        renderButtons();
    });

$(document).on("click", ".gif-btn", displayGifs);
$(document).on("click", ".gif", animateGif);

renderButtons(); 
