// var schedule = require('node-schedule');


// export const test = (ctx) => {
//     console.log('hellooo');
//     var j = schedule.scheduleJob('0 0 * * *', function(){
//         console.log('The answer to life, the universe, and everything!');
//       });
// }

export const signOut = () => {
  console.log('signing out')
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}

