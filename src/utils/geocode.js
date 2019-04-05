const request = require('request');

// Geocoding
// Address -> Lat / lONG -> Weather

// const geoUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoibWlja2V5ZW5nIiwiYSI6ImNqdHQ5dHlqMjB3dm80ZGw4MW93bXJ3bDEifQ.XygC53CVuF2M4onZPwvwmg";

// request({ url: geoUrl, json: true }, (error, response) => {

//     if (error) {
//         console.log("Unable to connect to the location service")
//     } else if (response.body.features.length === 0) {
//         console.log("Unable to find location");
//     } else {
//         const latitude = response.body.features[0].center[0];
//         const longitude = response.body.features[0].center[1];
//         console.log(latitude + " " + longitude);
//     }

// })

const geocode = (address, callback) => {
    const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibWlja2V5ZW5nIiwiYSI6ImNqdHQ5dHlqMjB3dm80ZGw4MW93bXJ3bDEifQ.XygC53CVuF2M4onZPwvwmg`;

    request({ url: geoUrl, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to the location service', undefined); // undefined is by default
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}




module.exports = {
    geocode: geocode,
}