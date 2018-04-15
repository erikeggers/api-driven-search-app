let movieKeywords;

//Check if local storage exists
if (localStorage.getItem('searchValue')) {
    let storage = localStorage.getItem('searchValue');
    document.querySelector('#movie-title').value = storage;
    movieKeywords = storage;
    searchQuery(storage);
}

//Capture search keywords
document.querySelector(".movie-search").addEventListener('submit', function(event){
    event.preventDefault();
    movieKeywords = document.querySelector('#movie-title').value;
    localStorage.setItem('searchValue', movieKeywords);
    console.log(localStorage.getItem('searchValue'));
    searchQuery(movieKeywords);
});

//Run search query
function searchQuery (keywords) {
    let url = 'https://api.themoviedb.org/3/search/movie?api_key=7262b9dce7fa1f8eb48117f0179c21ae&query=' + keywords + '&include_adult=false'

    fetch(url)
        .then(response => response.json())

        .then(responseAsJson => {

            let imageURL = 'https://image.tmdb.org/t/p/w1280/'
            const noPoster = 'https://images.pexels.com/photos/274937/pexels-photo-274937.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
            const movieContainer = document.querySelector('#movie-container');
            let results = responseAsJson.results;

            if (results.length != 0) {
                movieContainer.innerHTML="<h2> Results for " + movieKeywords + "</h2>";
            } else {
                movieContainer.innerHTML="<h2> No results for " + movieKeywords + "</h2>";
            }
            
            let movie = '<ul>';
            for (let i = 0; i < results.length; i++) {

                movie += '<li>'
                if (results[i].poster_path != null) {
                    movie += '<img src="' + imageURL + results[i].poster_path + '" alt="' + results[i].title + '">';
                } else {
                    movie += '<img src="' + noPoster + '" alt="' + results[i].title + '">';
                }

                movie += '<h3>' + results[i].title + '</h3>'
                movie += '<p>' + results[i].release_date + '</p>'
                movie += '<p>' + results[i].overview + '</p>'
                movie += '</li>'
            }

            movie += '</ul>';
            movieContainer.insertAdjacentHTML('beforeEnd', movie);

        })
        .catch( error => {
            console.log('Error: ', error)
    })
}
