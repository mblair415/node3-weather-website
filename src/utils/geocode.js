const request = require('request');


const mapBox_token = 'pk.eyJ1IjoiemVybzExMDEwIiwiYSI6ImNrM3NhczA3eTAwYXgzYm14NG02emE2amkifQ._6lYqo9t85_vI7vc5ibKaw';

const geocode = (city, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(city)}.json?access_token=${mapBox_token}&limit=1`;

    request( { url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services.', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find that location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                city: body.features[0].place_name
            });
        }
    });
};

module.exports = geocode;