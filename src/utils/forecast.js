const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8e5901065ca273107422a8316fbfd5a2&query=' + latitude
                + ',' + longitude + '&units=f'

request({url, json: true}, (error, {body}) => {
    if(error){
        callback('Unable to connect to weather seervice',undefined)
    } else if (body.error){
        callback('Unable to find location',undefined)
    } else{
        callback(undefined, body.current.weather_descriptions[0] + ', It is currently ' + body.current.temperature + ', It feels like ' +    body.current.feelslike)   
    }
})             
}

module.exports = forecast