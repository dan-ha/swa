// Exercise 11
/* Create your own version of Object.create() and Object.assign()
* Hint: Object.setPrototypeOf() and Object.getOwnPropertyNames()
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
*/ 

function objectCreate(proto) {
    const newObject = {}
    Object.setPrototypeOf(newObject, proto)
    return newObject
}

function objectAssign(target, source) {
    return {...target, ...source}
}

// TEST
const assert = require('assert').strict

const parent = {a: 'aaa', foo: () => 5}
const o1 = Object.create(parent)
const o2 = objectCreate(parent)
assert.deepStrictEqual(o1, o2)

const o3 = Object.assign({}, parent)
const o4 = objectAssign({}, parent)
assert.deepStrictEqual(o3, o4)