// Exercise 8
// Recreate exercise 4 with class keyword
class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    getName() { return this.name }
    setName(name) { this.name = name }
    getAge() { return this.age }
    setAge(age) { this.age = age }
    toString() { return `Person: ${this.name}, ${this.age}` }
    equals(person) { return this.name == person.name && this.age == person.age }
}

class Employee extends Person {
    constructor(name, age, salary) {
        super(name, age)
        this.salary = salary
    }
    getSalary() { return this.salary }
    setSalary(salary) { this.salary = salary }
    toString() { return `Employee: ${super.toString()}, ${this.salary}`}
    equals(employee) { return super.equals(employee) && this.salary == employee.salary}
}

// TEST
const assert = require('assert').strict

const person = new Person('Daniel', 23)
assert.strictEqual(person.getName(), 'Daniel')
assert.strictEqual(person.getAge(), 23)
assert.strictEqual(person.equals(new Person('Daniel', 23)), true)
console.log(person.toString())

const employee = new Employee('Eduard', 25, 150000)
assert.strictEqual(employee.getName(), 'Eduard')
assert.strictEqual(employee.getSalary(), 150000)
assert.strictEqual(employee.equals(new Employee('Eduard', 25, 150000)), true)
assert.strictEqual(employee.equals(new Employee('Eduard', 2, 15000)), false)
console.log(employee.toString())