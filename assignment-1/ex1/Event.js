const event = function (time, place) {
    return {
        getTime: () => time,
        setTime: newTime => time = newTime,
        getPlace: () => place,
        setPlace: (newPlace) => place = newPlace
    }
}

module.exports = event