const dateInterval = function (from, to) {
    return {
        getFrom: function () { return from },
        setFrom: function (newFrom) { from = newFrom },
        getTo: function () { return to },
        setTo: function (newTo) { to = newTo },
        contains: function (d) { return d >= from && d <= to }
    }
}

module.exports = dateInterval