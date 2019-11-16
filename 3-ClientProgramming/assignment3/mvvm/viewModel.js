import model from './model.js'
import dateInterval from './dateInterval.js'
import * as stats from './weatherStats.js'

const module = angular.module('weatherReport', [])
module.value('$model', { weatherData: [], weatherForecast: [] })

module.controller('weatherReportController', function ($scope, $model, $http) {

  $scope.model = $model
  let aModel = model()
  refresh()

  $scope.forPlace = () => {
    aModel = aModel.forPlace($scope.place)
    $scope.model.weatherData = aModel.weatherData()
    $scope.model.weatherForecast = aModel.weatherForecast()
  }

  $scope.forPeriod = () => {
    if($scope.fromDate && $scope.fromTime && $scope.toDate && $scope.toTime) {
      const from = new Date($scope.fromDate.getTime() + $scope.fromTime.getTime())
      const to = new Date($scope.toDate.getTime() + $scope.toTime.getTime())
      aModel = aModel.forPeriod(dateInterval(from, to))
      $scope.model.weatherData = aModel.weatherData()
      $scope.model.weatherForecast = aModel.weatherForecast()
    }
  }

  $scope.refresh = refresh
  function refresh () {
    $http.get('http://localhost:8080/data')
      .then(({ data: weatherData }) => {
        aModel = aModel.setWeatherData(weatherData)
        $scope.model.weatherData = aModel.weatherData()
      }).catch(console.err)

      $http.get('http://localhost:8080/forecast')
      .then(({ data: weatherForecast }) => {
        aModel = aModel.setWeatherForecast(weatherForecast)
        $scope.model.weatherForecast = aModel.weatherForecast()
      }).catch(console.err)
  }

  $scope.saveWD = () => {
    let weatherData = {type: $scope.type, value: $scope.value, unit: $scope.unit, time: $scope.time, place: $scope.place}
    $http.post('http://localhost:8080/data', [weatherData])
      .then(() => {
        aModel = aModel.addWeatherData(weatherData)
        $scope.model.weatherData = aModel.weatherData()
        $scope.type = ''
        $scope.typeMeta = ''
        $scope.value = ''
        $scope.unit = ''
        $scope.time = ''
        $scope.place = ''
      }).catch(console.err)
  }

  $scope.$watch('model.weatherData', function(newValue, oldValue, scope) {
    $scope.minTemp = stats.minTemperature($scope.model.weatherData)
    $scope.maxTemp = stats.maxTemperature($scope.model.weatherData)
    $scope.totalPrecipitation = stats.totalPrecipitaion($scope.model.weatherData)
    $scope.avgWind = stats.averageWind($scope.model.weatherData)
    $scope.dominantWindDirection = stats.dominantWindDirection($scope.model.weatherData)
    $scope.avgCloudCoverage = stats.averageCloudCoverage($scope.model.weatherData)
  }, true)
})
