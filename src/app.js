const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup directory to serve
app.use(express.static(publicDirectoryPath))

// root page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Mickey English'
    })
})

// about page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page dynamic',
        name: 'Mickey English'
    });
})

//help page
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        helpText: 'Thsi is some help text',
        name: 'Mickey English'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        name: 'mickey English',
        errorText: 'Help article not found',
        title: '404'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide a search address"
        })
    }

    geocode.geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }


        forecast.forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })

    });

})

// 404 page
app.get('*', (req, res) => {
    res.render('404', {
        title: '404 page',
        errorText: 'Page not found',
        name: 'Mickey English'
    });
})



// start server
app.listen(3000, () => {
    console.log("Server is up on port 3000")
});




