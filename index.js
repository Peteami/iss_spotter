
// const { fetchMyIP } = require('./iss');
// const { fetchCoordsByIP } = require('./iss');
// const { fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMyLocation} = require('./iss');



const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCseconds(pass.risetime);
    const duration = pass.duration;
    console.log(`next pass at ${datetime} for ${duration} seconds!`);
  }
};



nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!" , error);
  }
  printPassTimes(passTimes);
});

// nextISSTimesForMyLocation((error, passTimes) => {
//   console.time('Getting Result');
//   if (error) {
//         console.log("It didn't work!" , error);
//         return;
//       }
//       translateDate(passTimes);
//       console.timeEnd('Getting Result');
// });

// const translateDate = function(dateObj) {
//   for (let timeStamp of dateObj) {
//     const date = new Date(0);
//     date.setUTCSeconds(timeStamp.risetime);
//     console.log(`Next pass at ${date} for ${timeStamp.duration} seconds!`);
//   }
// };


// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });



// fetchCoordsByIP('189.174.65.211', (error, coords) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log("Here are the coordinates from the ip adress:", coords)
// });



// const exampleCoords = { latitude: '49.27670', longitude: '-123.13000' };

// fetchISSFlyOverTimes(exampleCoords, (error, passTimes) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned flyover times:' , passTimes);
// });