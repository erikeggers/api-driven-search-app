var movieKeywords;

document.getElementById("btn").addEventListener('click', function(event){
    event.preventDefault();
    movieKeywords = document.querySelector('#movie-title').value;
    var mkWithPlus = movieKeywords.split(' ').join('+');
    console.log(mkWithPlus);
    searchQuery(mkWithPlus);
});

function searchQuery (keywords) {
    var url = 'https://api.themoviedb.org/3/search/movie?api_key=7262b9dce7fa1f8eb48117f0179c21ae&query=' + keywords

    fetch(url)
        .then(response => response.json())

        .then(responseAsJson => {

            var results = responseAsJson.results;
            for (var i = 0; i < results.length; i++) {
            

                console.log(results[i].title);
            }
        //console.log(responseAsJson);
        })
        .catch( error => {
            console.log('Error: ', error)
    })
}