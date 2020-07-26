const path = require('path');
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup hnadlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Mohamed Yaseen'
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        quote: 'Decisive, strategic and self-driven professional person. I do trust myself and my capabilities to reach a high degree of knowledge in my career.',
        title: 'About Me',
        name: 'Mohamed Yaseen'
    })
})

app.get('/contact-me', (req, res) => {
    res.render('contact', {
        email: 'mohamed.yaseen.elmandy@gmail.com',
        contactNumber1: '+971585215774',
        contactNumber2: '+201098588683',
        title: 'Contact Me',
        name: 'Mohamed Yaseen'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                error
            })
        }
        forecast(latitude,longitude, (error, forecastData) => {
            if(error){
              return  res.send({
                    error
                })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })

    })
})


app.get('/products', (req, res) => {
    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title:'404',
        errorMessage:'Help article not found',
        name: 'Mohamed Yaseen'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title:'404',
        errorMessage:'Page not found',
        name: 'Mohamed Yaseen'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})