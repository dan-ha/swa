export default class DateInterval {
    constructor(from, to) {
        this.from = from
        this.to = to
    }
    contains(d) {
        return d >= this.from && d <= this.to 
    }
}
