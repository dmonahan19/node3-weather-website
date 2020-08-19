const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')


const app = express();

//Defines paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPaths = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPaths);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: "Danielle"
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: "Danielle"
    })
});

app.get('/help', (req,res)=>{
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Danielle'
    })
})

// app.get('', (req,res) => {
//     res.send('<h1>Weather</h1>');
// });


app.get('/weather', (req,res) =>{
    const address = req.query.address
   
    if (!address){
        return res.send({
            error:'You must provide a address'
        })
    }
   
    geocode(address, (error, { latitude, longitude, location} = {}) => {
        if (error){
            return res.send({
                error: error
            })
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({error});
            }
    
            res.send({
                location: location,
                forecast: forecastData,
                address: req.query.address
             })
        });
    });

    
});

app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error:'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
});

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: 404,
        errorMessage: "Help article not found",
        name: 'Danielle'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 404,
        name: 'Danielle',
        errorMessage:  "Page not found",
    })
});

app.listen(3000, () => {
    console.log('Server is up on port 3000')
});


