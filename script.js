$("#search-button").on("click", function () {
  $.ajax({
    url: "http://www.omdbapi.com/",
    type: "get",
    dataType: "json",
    data: {
      apikey: "9430f0f4",
      s: $("#search-input").val(),
    },
    success: function (response) {
      let movies = response.Search;

      if (response.Response == "True") {
        $.each(movies, function (i, data) {
          $("#movie-list").append(
            `
                <div class="col-md-3">
                    <div class="card" style="width: 18rem;">
                        <img src="` +
              data.Poster +
              `" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">` +
              data.Title +
              `</h5>
                            <p class="card-text">` +
              data.Year +
              `</p>
                            <a href="#" class="btn btn-primary see-detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id=` +
              data.imdbID +
              `>Detail</a>
                        </div>
                    </div>
                </div>
                `
          );
        });
      } else {
        $("#movie-list").html(`
            <div class="col">
            <h1 class="text-center">Movie Not Found!</h1>
            </div>
            `);
      }
    },
  });
});

$("#movie-list").on("click", ".see-detail", function () {
  $.ajax({
    url: "http://www.omdbapi.com/",
    type: "get",
    dataType: "json",
    data: {
      apikey: "9430f0f4",
      i: $(this).data("id"),
    },
    success: function (data) {
      $(".modal-body").html(
        `
             <div class="container-fluid">
                <div class="row">
                    <div class="col-md-4">
                        <img src="` +
          data.Poster +
          `" class="card-img-top" alt="...">
                    </div>
                    <div class="col-md-8">
                    <ul class="list-group">
                      <li class="list-group-item"><h1> ` +
          data.Title +
          ` </h1></li>
          <li class="list-group-item">Genre : ` +
          data.Genre +
          `</li>
                      <li class="list-group-item">Actors : ` +
          data.Actors +
          `</li>
                      <li class="list-group-item">Plot : ` +
          data.Plot +
          `</li>
                    </ul>
                    </div>
                </div>
            </div>
            `
      );
    },
  });
});
