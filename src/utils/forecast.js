const request = require('request');

const weatherStack_url = 'http://api.weatherstack.com/current';
const weatherStack_access_key = '13389776a5ccaf464d73ea12d5d81fd1';
const fahrenheit = true;

let location;
let completeURL;

const forecast = (longitude, latitude, callback) => {
    location = `${longitude},${latitude}`;
    completeURL = `${weatherStack_url}?access_key=${weatherStack_access_key}&query=${location}&${fahrenheit ? 'units=f' : ''}`;

    request({ url: completeURL, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to servece.  Check network connection.', undefined);
        } else if (!body.current) {
            callback('Was not able to identify the location requested.', undefined);
        } else {
            callback(undefined, {
                temperature: body.current.temperature,
                feelsLike: body.current.feelslike,
                precip: body.current.precip,
                description: body.current.weather_descriptions[0].toLowerCase(),
                where: body.location.name
            });
        }
    });
};

module.exports = forecast;
