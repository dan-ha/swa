// Exercise 6
/* Recreate the Person() and Employee() functions from exercise 4 
* using named(state), aged(state) and salaried(state) 
* mixin-like factory functions and combining them. 
* Does this change your answer to exercise 4?
*/
function named({ name }) {
    function getName() { return name }
    function setName(newName) { name = newName }
    return { getName, setName }
}

function aged({ age }) {
    function getAge() { return age }
    function setAge(newAge) { age = newAge }
    return { getAge, setAge }
}

function salaried({ salary }) {
    function getSalary() { return salary }
    function setSalary(newSalary) { salary = newSalary }
    return { getSalary, setSalary }
}

function Person(name, age) {
    const state = { name, age }
    function toString() { return `Person: ${this.getName()}, ${this.getAge()}`}
    return { ...named(state), ...aged(state), toString }
}

function Employee(name, age, salary) {
    const state = { name, age, salary }
    function toString() { return `Employee: ${this.getName()}, ${this.getAge()}, ${this.getSalary()} `}
    return { ...named(state), ...aged(state), ...salaried(state), toString }
}

// Test
const assert = require('assert').strict

const person = Person('Daniel', 23)
assert(person.toString(), 'Person: Daniel, 59')

const employee = Employee('Eduard', 25, 25000)
assert(employee.toString(), 'Employee: Eduard, 25, 25000')