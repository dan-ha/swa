export const minTemperature = (weatherData) => filterType(weatherData, 'temperature').reduce((acc, cur) => Math.min(acc, cur.value), Number.MIN_VALUE)
export const maxTemperature = (weatherData) => filterType(weatherData, 'temperature').reduce((acc, cur) => Math.max(acc, cur.value), Number.MIN_VALUE)

export const averageWind = (weatherData) => avg(filterType(weatherData, 'wind speed'))
export const averageCloudCoverage = (weatherData) => avg(filterType(weatherData, 'cloud coverage'))

export const totalPrecipitaion = (weatherData) => filterType(weatherData, 'precipitation').reduce((sum, cur) => sum += cur.value, 0)

export const dominantWindDirection = (weatherData) => {
  let wind = filterType(weatherData, 'wind speed')
  let dirFreq = wind.reduce((acc, cur) => {
      acc[cur.direction] ? acc[cur.direction]++ : acc[cur.direction] = 1
      return acc
  }, [])
  let domDir = undefined
  let domDirCount = 0
  for (let dir in dirFreq) {
      if (dirFreq[dir] > domDirCount) {
          domDir = dir
          domDirCount = dirFreq[dir]
      }
  }
  return domDir
}

const filterType = (weatherData, type) => weatherData.filter(wd => wd.type === type)
const avg = (weatherData) => weatherData.reduce((sum, cur) => sum += cur.value, 0) / weatherData.length