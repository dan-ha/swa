// Write three JavaScript functions that gets all the weather data from localhost:8080/data and prints the temperatures to the console

// Use XMLHTTPRequest
function printTemperaturesXHR() {
    const request = new XMLHttpRequest()
    request.open('GET', 'http://localhost:8080/data')
    request.send()
    request.onload = () => {
        const data = JSON.parse(request.responseText)
        printTemperatures(data)
    }
}

// Use fetch
function printTemperaturesFetch() {
    fetch('http://localhost:8080/data', {
        headers: {
            'Accept': 'application/json'
        }
    }).then(res => res.json())
        .then(data => printTemperatures(data))
}

// Use fetch with asyn/await
async function printTemperaturesFetchAA() {
    let res = await fetch('http://localhost:8080/data', {
        headers: {
            'Accept': 'application/json'
        }
    })
    let data = await res.json()
    printTemperatures(data)
}

function printTemperatures(data) {
    data.filter(d => d.type === 'temperature').map(t => console.log(t))
}