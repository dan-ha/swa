function DateInterval(from, to) {
    this.from = from
    this.to = to
}
DateInterval.prototype.contains = function(d) {
    return d >= this.from && d <= this.to
}

module.exports = DateInterval