var movieKeywords;

document.getElementById("btn").addEventListener('click', function(event){
    event.preventDefault();
    movieKeywords = document.querySelector('#movie-title').value;
    searchQuery(movieKeywords);
});

function searchQuery (keywords) {
    var url = 'https://api.themoviedb.org/3/search/movie?api_key=7262b9dce7fa1f8eb48117f0179c21ae&query=' + keywords + '&include_adult=false'


    fetch(url)
        .then(response => response.json())

        .then(responseAsJson => {

            var imageURL = 'https://image.tmdb.org/t/p/w1280/'
            var noPoster = 'https://images.pexels.com/photos/274937/pexels-photo-274937.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
            var movieContainer = document.querySelector('#movie-container');
            movieContainer.innerHTML="<h2> Results for " + movieKeywords + "</h2>";
            var movie = '<ul>';

            var results = responseAsJson.results;
            for (let i = 0; i < results.length; i++) {

                movie += '<li>'
                if (results[i].poster_path != null) {
                    movie += '<img src="' + imageURL + results[i].poster_path + '" alt="' + results[i].title + '">';
                } else {
                    movie += '<img src="' + noPoster + '" alt="' + results[i].title + '">';
                }

                movie += '<p>' + results[i].title + '</p>'
                movie += '<p>' + results[i].release_date + '</p>'
                movie += '<p>' + results[i].overview + '</p>'

                movie += '</li>'

                console.log(results[i].title);
            }

            movie += '</ul>';
            movieContainer.insertAdjacentHTML('beforeEnd', movie);
        //console.log(responseAsJson);

        })
        .catch( error => {
            console.log('Error: ', error)
    })
}

//https://image.tmdb.org/t/p/w1280/
