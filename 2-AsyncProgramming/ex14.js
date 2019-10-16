// Exercise 14
// Write immutable versions of factory functions from exercise 2

const pointFactory = (x, y) => {
    const getX = () => x
    const getY = () => y
    const moveTo = (_x, _y) => pointFactory(_x, _y)
    const toString = () => `X: ${x}, Y: ${y}`
    const copy = () => pointFactory(x, y)
    return {
        getX,
        getY,
        moveTo,
        toString,
        copy
    }
}

const circleFactory = (center, radius) => {
    const getCenter = () => center
    const getRadius = () => radius
    const moveTo = (x, y) => circleFactory(center.moveTo(x, y), radius)
    const toString = () => `Center: ${center.toString()}, radius: ${radius}`
    return {
        getCenter,
        getRadius,
        moveTo,
        toString
    }
}

// TEST
const assert = require('assert').strict

let point = pointFactory(5, 10)
assert.strictEqual(point.getX(), 5)
assert.strictEqual(point.getY(), 10)
let movedPoint = point.moveTo(6, 11)
assert.strictEqual(point.getX(), 5)
assert.strictEqual(point.getY(), 10)
assert.strictEqual(movedPoint.getX(), 6)
assert.strictEqual(movedPoint.getY(), 11)
assert.strictEqual(movedPoint.toString(), 'X: 6, Y: 11')

let circle = circleFactory(point, 3)
assert.deepStrictEqual(circle.getCenter(), point)
assert.strictEqual(circle.getRadius(), 3)
let movedCircle = circle.moveTo(7, 12)
assert.deepStrictEqual(circle.getCenter(), point)
assert.strictEqual(circle.getRadius(), 3)
assert.deepStrictEqual(movedCircle.getCenter().getX(), 7)
assert.deepStrictEqual(movedCircle.getCenter().getY(), 12)
assert.strictEqual(movedCircle.getRadius(), 3)
