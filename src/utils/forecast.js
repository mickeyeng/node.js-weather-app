const request = require('request');



// request({ url: url, json: true }, (error, response) => {

//     if (error) {
//         console.log("Unable to connect to weather service");
//     } else if (response.body.error) {
//         console.log("Unable to find location")
//     }
//     else {
//         console.log(response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + " degrees out. There is a " + response.body.currently.precipProbability + " chance of rain.");
//     }
// })


const forecast = (long, lat, callback) => {
    const url = `https://api.darksky.net/forecast/80f5c5a890a5ef8377fef5a5493a8ed8/${lat},${long}?units=si`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to the weather service", undefined);
        } else if (body.error) {
            callback('Unable to find location. Please try again')
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + " degrees out. The high today is " + body.daily.data[0].temperatureHigh + " with a low of " + body.daily.data[0].temperatureLow + ". There is a " + body.currently.precipProbability + " chance of rain.");
        }
    })
};

module.exports = {
    forecast: forecast,
}