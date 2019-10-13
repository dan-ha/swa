// Exercise 2 Implement class model

//#region 2.a - Implement the model in JavaScript using factory functions.
// Factory function is a function that creates and returns an object
function pointFactory(x, y) {
    function getX() { return x }
    function getY() { return y }
    function moveTo(x2, y2) {
        x = x2
        y = y2
    }
    function toString() {
        return `X: ${x}, Y: ${y}`
    }
    function copy() {
        return pointFactory(x, y)
    }

    return {
        getX,
        getY,
        moveTo,
        toString,
        copy
    }
}

function circleFactory(center, radius) {
    function getCenter() { return center }
    function getRadius() { return radius }
    function moveTo(x, y) {
        center.moveTo(x, y)
    }
    function toString() {
        return `Center: ${center.toString()}, radius: ${radius}`
    }
    return {
        getCenter,
        getRadius,
        moveTo,
        toString
    }
}
//#endregion

//#region 2.b - Create an array of circles. Use the array map() method to create an array with the radius of each circle.
const circles = [
    circleFactory(pointFactory(5, 10), 3),
    circleFactory(pointFactory(10, 15), 4),
    circleFactory(pointFactory(15, 20), 5),
    circleFactory(pointFactory(20, 25), 6),
    circleFactory(pointFactory(25, 30), 7),
    circleFactory(pointFactory(30, 35), 8),
]

let rads = circles.map((circle) => circle.getRadius());
console.log(radiuses)
//#endregion

//#region 2.c - add overloaded constructor to Circle: Circle(x: double, y: double, radius: double)
function circleFactoryOverloaded(...args) {
    let center
    let radius
    if (args.length === 3) {
        center = pointFactory(args[0], args[1])
        radius = args[2]
    } else {
        center = args[0]
        radius = args[1]
    }

    function getCenter() {
        return center
    }
    function getRadius() {
        return radius
    }
    function moveTo(x, y) {
        center.moveTo(x, y)
    }
    function toString() {
        return `Center: ${center.toString()}, radius: ${radius}`
    }
    return {
        getCenter,
        getRadius,
        moveTo,
        toString
    }
}
//#endregion

