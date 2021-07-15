const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup director to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'batman'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: "this is that new new, yo",
        name: "batman"
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helper: 'Here to give you aid',
        title: 'Help title',
        name: 'batman'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        });
    }

    geocode(req.query.address, (error, {longitude, latitude, city } = {}) => {
        if (!error) {

            return forecast(longitude, latitude, 
                (error, {
                    temperature, feelsLike, precip, description
                }) => {
                    if (!error) {
                        
                        return res.send({
                            city,
                            description,
                            temperature,
                            feelsLike,
                            precip                            
                        });
                    } else {
                        return res.send({ error });
                    }
            });
        } else {
            return res.send({ error });
        }
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        });
    }
    console.log(req.query.search);
    return res.send({
        products: ['Legend of Zelda']
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help page not found',
        name: 'batman'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'batman'
    });
});

app.listen(3000, () => {
    console.log('server is up on port 3000')
});