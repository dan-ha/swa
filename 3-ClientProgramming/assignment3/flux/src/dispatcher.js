const dispatcher = store => async ({ type, ...params }) => {
  switch (type) {
    case 'place':
      store({ type, ...params })
      break
    case 'period':
      store({ type, ...params })
      break
    case 'refresh':
      const weatherData = await fetch('http://localhost:8080/data').then(res => res.json())
      const weatherForecast = await fetch('http://localhost:8080/forecast').then(res => res.json())
      store({ type, ...params, weatherData, weatherForecast })
      break
    case 'add':
      await fetch('http://localhost:8080/data',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify([params.weatherData]),
        }).then(res => console.log(res))
        store({ type, ...params })
      break
    default:
      break
  }
}

export default dispatcher