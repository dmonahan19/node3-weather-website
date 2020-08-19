const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=74ea216d3b5ca1ad5c7ecca3f06597a0&query=' +  encodeURIComponent(longitude) +',' +  encodeURIComponent(latitude) + '&units=f'
    
    request({url, json:true}, (error, {body}) => {
        if (error){
            callback('Unable to connect to weather service!')
        } else if (body.error){
            callback('Unable to find location')
        } else{
            // callback(undefined, {
            //         description: response.body.current.weather_descriptions[0],
            //         temperature: response.body.current.temperature,
            //         feelslike: response.body.current.feelslike
            // });
            var printSentence = body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature+
            " degrees out but it feels like " 
            + body.current.feelslike + " degrees. The humidity is " + body.current.humidity + "%."
           
            callback(undefined, printSentence);
       
        }
    });
    
      
}

module.exports = forecast
