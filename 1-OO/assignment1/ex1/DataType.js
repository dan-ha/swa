const dataType = function (type, unit) {
    return {
        getType: function () { return type },
        setType: function (newType) { type = newType },
        getUnit: function () { return unit },
        setUnit: function (newUnit) { unit = newUnit }
    }
}

module.exports = dataType