// Exercise 18
// a. Implement a reduce(array, operator, defaultValue) function without using the built-in reduce.
function reduce(array, operator, defaultValue) {
    let res = defaultValue
    for (let i = 0; i < array.length; i++) {
        res = operator(res, array[i])
    }
    return res
}

// b. Implement map and filter using your reduce function from (a). (Hint: defaultValue = [])
function map(array, callback) {
    return reduce(array, (res, cur) => {
        res.push(callback(cur))
        return res
    }, [])
}

function filter(array, callback) {
    return reduce(array, (res, cur) => {
        if(callback(cur)){
            res.push(cur)
        }
        return res
    }, [])
}
// TEST
const assert = require('assert').strict

let arr = [1, 2, 3, 4, 5]

let operator = (res, cur) => res += cur
assert.strictEqual(reduce(arr, operator, 0), arr.reduce(operator))

let mapCallback = a => a+=1
assert.deepStrictEqual(map(arr, mapCallback), arr.map(mapCallback))

let isEven = (a) => a % 2 == 0
assert.deepStrictEqual(filter(arr, isEven), arr.filter(isEven))
