var twit = require('twitter'),
    twitter = new twit({
      consumer_key: 'RITEDvo4StsxrEu7r8jQL9TE7',
      consumer_secret: 't58drMRMABavSwzxSdtJg4iIjdpfaiNojKwkEfyGZ4J7eIhnkt',
      access_token_key: '133815258-j7FEATTteoaVDRDT8aeogHhdhN85eSmkmK5n6pjF',
      access_token_secret: 'Zb1CLAf6EWPVTUr9PTqpHXFw5oNLcRgbeqWcWaCqV7cTx'
    });

//Sample usage of stream
var util = require('util');

// twitter.stream('statuses/filter', {track: 'Avengers'}, function(stream){
//   stream.on('data', function(data){
//     //console.log(util.inspect(data));
//     console.log(data.text);
//     stream.destroy();
//     process.exit(0);
//   });
// });

//Query a timeline for a given screen name
// var params = {screen_name: 'rajatrap'};
// twitter.get('/statuses/user_timeline', params, function(error, tweets, response){
//   if (!error){
//     console.log(tweets);
//   }
// });

// Get users whom I am following but they are not following me
var params = {screen_name: 'rajatrap'};
var nonFollowers = [];
twitter.get('followers/ids', params, function(error, followers_result, response){
  if (error){
    console.log(error);
  }
  var followers = followers_result.ids;
  twitter.get ('friends/ids', params, function(error, following_result, response){
    if (error){
      console.log(error);
    }
    var following=following_result.ids;
    following.forEach(function(person){
      if (followers.indexOf(person) === -1)
      {
        nonFollowers.push(person);
      }
    });
    // console.log('Non follower IDs');
    var string_nonFollowers = nonFollowers.join();
    // console.log(string_nonFollowers);
    twitter.get('users/lookup', {user_id: string_nonFollowers}, function(error, nonfollower_results, response){
      if (error){
        console.error(error);
      }
      console.log('People whom I follow, but they dont follow me:');
      nonfollower_results.forEach(function(person_object){
        console.log(person_object.name);
      });
    });
  });
});
