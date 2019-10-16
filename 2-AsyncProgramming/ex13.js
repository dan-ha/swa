// Exercise 13 Closures
// a. Create a function that takes a value n, and returns a function that 
// raises its argument to the power of n
const powOf = (n) => (number) => Math.pow(number, n)

//b. Create a function that returns the function that gives subsequent elements of Fibbonaci sequence
const fib = () => {
    let fibPrev = 0
    let fibCurr = 1
    return () => {
        let helper = fibCurr
        fibCurr = fibCurr + fibPrev
        fibPrev = helper
        return fibCurr
    }
}

// Test
// a. 
const assert = require('assert').strict

const pow3 = powOf(3)
assert.strictEqual(pow3(2), 8)
assert.strictEqual(pow3(3), 27)

// b.
const fib1 = fib()
assert.strictEqual(fib1(), 1)
assert.strictEqual(fib1(), 2)
assert.strictEqual(fib1(), 3)
assert.strictEqual(fib1(), 5)
assert.strictEqual(fib1(), 8)
const fib2 = fib()
assert.strictEqual(fib2(), 1)
assert.strictEqual(fib2(), 2)
assert.strictEqual(fib1(), 13)