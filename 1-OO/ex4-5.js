// Exercise 4
// 4.1 Create a person_prototype object with all the methods of Person
const person_prototype = {
    getName: function () { return this.name },
    setName: function (name) { this.name = name },
    getAge: function () { return this.age },
    setAge: function (age) { this.age = age },
    toString: function () { return `Person: ${this.name}, ${this.age}` },
    equals: function (person) { return this.name == person.name && this.age == person.age }
}

// 4.2 Create an employee_prototype object with the methods of employee that inherits from person_prototype
const employee_prototype = Object.create(person_prototype)

employee_prototype.getSalary = function () { return this.salary }
employee_prototype.setSalary = function (salary) { this.salary = salary }
employee_prototype.toString = function () { return `Employee: ${this.salary}` }
employee_prototype.equals = function (employee) { return this.__proto__ == employee.__proto__ && this.salary == employee.getSalary() }

// 4.3 Create a Person() function that takes a name and an age and returns a new object with that name and age and the prototype person_prototype
const Person = function (name, age) {
    const person = Object.create(person_prototype)
    person.name = name
    person.age = age

    return person
}

// 4.4 Create an Employee() function that takes a name, an age, and a salary and returns a new object with that name, age and salary, and the prototype employee_prototype
const Employee = function (name, age, salary) {
    const employee = Object.create(employee_prototype)
    employee.name = name
    employee.age = age
    employee.salary = salary

    return employee
}



/* 5. Test your implementation from exercise 4 by creating and testing a function 
* that returns the total salary of all employees with an age above 18 that are named bill
* from an array of persons (and employees)
*/
const totalSalaryOfAdultsNamedBill = (employees) => {
    return employees.filter(e => e.age > 18)
        .filter(e => e.name === 'bill')
        .reduce((accumulator, employee) => accumulator + employee.salary, 0)
}

const employees = [
    Employee('bill', 16, 100),
    Employee('Eduard', 25, 25000),
    Employee('Lukas', 16, 15000),
    Employee('bill', 24, 19000),
    Employee('Dan', 12, 50000),
    Employee('Marek', 26, 14000),
    Employee('bill', 40, 1000000),
    Employee('Martin', 22, 37000)
]

console.log(totalSalaryOfAdultsNamedBill(employees))