var schedule = require('node-schedule');

export const test = (ctx) => {
    console.log('hellooo');
    var j = schedule.scheduleJob('0 0 * * *', function(){
        console.log('The answer to life, the universe, and everything!');
      });
}

// test();