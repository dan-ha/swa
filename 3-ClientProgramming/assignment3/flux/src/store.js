import dateInterval from './dateInterval.js'

const store = (init_model, view, renderer) => {
  let model = init_model

  function reducer(action, model) {
    switch(action.type) {
      case 'place':
        return model.forPlace(action.place)
      case 'period':
        const { from, to } = action
        return model.forPeriod(dateInterval(new Date(from) , new Date(to)))
      case 'refresh':
        return model
          .setWeatherData(action.weatherData)
          .setWeatherForecast(action.weatherForecast)
      case 'add':
        return model.addWeatherData(action.weatherData)
      default:
        return model
    }
  }

  return action => {
    model = reducer(action, model)
    renderer(view(model))
  }
}

export default store