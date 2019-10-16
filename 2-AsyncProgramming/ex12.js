// Exercise 12 - Map, filter, reduce
// Rewrite the following functions using map, filer, reduce

function names(persons) {
    let ns = []
    for (let i = 0; i < persons.length; i++) {
        ns.push(persons[i].name)
    }
    return ns
}

function namesHO(persons) {
    return persons.map(p => p.name)
}

function adults(persons) {
    let adults = []
    for (let i = 0; i < persons.length; i++) {
        if (persons[i].age >= 18) {
            adults.push(persons[i])
        }
    }
    return adults
}

function adultsHO(persons) {
    return persons.filter(p => p.age >= 18)
}

function oldest_person(persons) {
    let oldest = null
    for (let i = 0; i < persons.length; i++) {
        if (!oldest || persons[i].age > oldest.age) {
            oldest = persons[i]
        }
    }
    return oldest
}

function oldest_personHO(persons) {
    return persons.reduce((acc, cur) => acc.age < cur.age ? cur : acc)
}

function total_salaries_of_seniors(persons) {
    let total = 0
    for(let i = 0; i < persons.length; i++) {
        if(persons[i].age >= 60) {
            total+= persons[i].salary
        }
    }
    return total
}

function total_salaries_of_seniorsHO(persons) {
    return persons
        .filter(p => p.age >= 60)
        .reduce((acc, cur) => acc+=cur.salary, 0)
}

// TEST
const assert = require('assert').strict

const persons = [
    {
        name: 'Daniel',
        age: 23,
        salary: 0
    },{
        name: 'Richard',
        age: 14,
        salary: 100
    }, {
        name: 'Hans',
        age: 61,
        salary: 40000 
    }, {
        name: 'Jens',
        age: 70,
        salary: 50000
    }
]

assert.deepStrictEqual(names(persons), namesHO(persons))
console.log('names, namesHO -> OK')
assert.deepStrictEqual(adults(persons), adultsHO(persons))
console.log('adults, adultsHO -> OK')
assert.deepStrictEqual(oldest_person(persons), oldest_personHO(persons))
console.log('oldest_person, oldest_personHO -> OK')
assert.strictEqual(total_salaries_of_seniors(persons), total_salaries_of_seniorsHO(persons))
console.log('total_salaries_of_seniors, total_salaries_of_seniorsHO -> OK')