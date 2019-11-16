const model = (wd = [],  wf = [], place, type, period) => {  
  
  const setWeatherData = newWeatherData => model(newWeatherData, wf, place, type, period)
  const addWeatherData = newWeatherData => model(wd.concat(newWeatherData), wf, place, type, period)

  const setWeatherForecast = newWeatherForecast => model(wd, newWeatherForecast, place, type, period)

  const forPlace = newPlace => model(wd, wf, newPlace, type, period)
  const forType = newType => model(wd, wf, place, newType, period)
  const forPeriod = newPeriod => model(wd, wf, place, type, newPeriod)

  const weatherData = () => filter(wd)
  const weatherForecast = () => filter(wf)

  const filter = collection => {
    return collection
      .filter(wd => place ? wd.place === place : true)
      .filter(wd => type ? wd.type === type : true)
      .filter(wd => period ? period.contains(new Date(wd.time)) : true)
  }

  return { 
    weatherData, setWeatherData, addWeatherData,
    weatherForecast, setWeatherForecast, 
    forPlace, forType, forPeriod }
}

export default model