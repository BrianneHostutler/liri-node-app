// At the top of the liri.js file make it so you grab the data 
// from keys.js and store it into a variable to use

// Make it so liri.js can take in one of the following arguments

// my-tweets

// spotify-this-song

// movie-this

// do-what-it-says

// node liri.js my-tweets:
var fs = require('fs');
var twitterKeys = require("./keys.js");
var twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');

var action = process.argv[2];

switch(action) {
    case 'my-tweets': myTweets(); break;
    case 'spotify-this-song': spotifyThisSong(); break;
    case 'movie-this': movieThis(); break;
    case 'do-what-it-says': doWhatItSays(); break;
};

//Shows 20 tweets
function myTweets(userName) {

	var client = new Twitter ({
	  consumer_key: keysJs.twitterKeys.consumer_key,
	  consumer_secret: keysJs.twitterKeys.consumer_secret,
	  access_token_key: keysJs.twitterKeys.access_token_key,
	  access_token_secret: keysJs.twitterKeys.access_token_secret
	});

	userName= process.argv[3];

	var params = {screen_name: userName};
		client.get('statuses/user_timeline', params, function(error, tweets, response){
		  if (!error) {
		  	for (var i = 0; i < 20; i++) {
		    console.log(tweets);
			}
		  }
		});

}

//takes in the song name and searches for info about it
function spotifyThisSong(song) {

	song= process.argv[3];

	spotify.search({ type: 'track', query: song }, function(err, data) {
		for (var i = 0; i < 5; i++) {
	        	if (data.tracks.items[i] != undefined) {
			    	console.log('Artist: ' + data.tracks.items[i].artists[0].name)
			    	console.log('Song: ' + data.tracks.items[i].name)
			    	console.log('Album: ' + data.tracks.items[i].album.name)
			    	console.log('Preview Url: ' + data.tracks.items[i].preview_url)
			    }
	        }
	    if ( error ) {
	        console.log('Error occurred: ' + error);
	        return;
	    }
	});
}

//
function movieThis() {

	movie = process.argv[3];

	request('http://www.omdbapi.com/?t='+movie+'&y=&plot=short&r=json&tomatoes=true"', function (error, response, body) {
	  if (!error && response.statusCode == 200) { //200 = successful request
	    var movieText= 
	    "Title: " + JSON.parse(body)["Title"]+ "\n" +
	    "Year: " + JSON.parse(body)["Year"]+ "\n" +
	    "IMDB Rating: " + JSON.parse(body)["imdbRating"]+ "\n" +
	    "Country: " + JSON.parse(body)["Country"]+ "\n" +
	    "Language: " + JSON.parse(body)["Language"]+ "\n" +
	    "Plot: " + JSON.parse(body)["Plot"]+ "\n" +
	    "Actors: " + JSON.parse(body)["Actors"]+ "\n" +
	    "Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"]+ "\n" +
	    "Rotten Tomato URL: " + JSON.parse(body)["tomatoURL"]
	    console.log(movieText);// Show the text in the terminal
		}
	});

};

function doWhatItSays() {
  fs.readFile("./random.txt", "utf8", function(error, data) {
    if(error) {
      console.log('Error occurred: ' + error);
      return;
    }
    data = data.split(',');
    spotifyThisSong();
  })
};

// var request = require('request');

// request('', function (error, response, body) {
//   if (!error && response.statusCode == 200) { //200 = successful request
//     console.log(body); // Show the HTML for the homepage.
// 	}
// });



