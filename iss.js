
const request = require('request');




const nextISSTimesForMyLocation = function(callback) {

  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, nextPasses);
      });
    });
  });
};




const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json', (error, response, body) => {

    // inside the request callback ...
    // error can be set if invalid domain, user is offline, etc.
    if (error) {
      return callback(error, null);
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    // if we get here, all's well and we got the data


    const ip = (JSON.parse(body)).ip;
    // console.log(`My ip is : ${ipAdress}`);
    callback(null, ip);
  });
};



const fetchCoordsByIP = function(ip, callback) {
  request(`https://ipvigilante.com/JSON/${ip}`, (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching coordinates for IP: ${body}`), null);
      return;
    }

    // if we get here, all's well and we got the data
    const { latitude, longitude } = JSON.parse(body).data;
    // console.log(`Coordinates are: ${ longitude, latitude }`)
    callback(null, { latitude, longitude });
    
  });
};


const fetchISSFlyOverTimes = function(coords, callback) {
  const apiISS = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(apiISS, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }

    // if we get here, all's well and we got the data

    const passes = JSON.parse(body).response;
    callback(null, passes);
    
  });
};





// module.exports = { fetchMyIP };
// module.exports = { fetchCoordsByIP };
// module.exports = { fetchISSFlyOverTimes };
module.exports = { nextISSTimesForMyLocation };