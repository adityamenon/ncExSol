// use express to listen for the route and receive the params
// call the geocoding service to get latitude and longitude
// call forecasting service to get weather forecast information
// render the results according to the incoming request format header
// in case of any promise rejections, bubble the error out to HTTP via the express error handler interface