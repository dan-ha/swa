// JavaScript RECAP

////////////////////////////
// Exercise 10.1 - truthy
////////////////////////////
console.log('Exercise 10.1');
console.log(2 + 2 === 4);           //true
console.log(2 + 2 === '4');         //false
console.log(2 + 2 == '4');          //true
console.log(Boolean(Number('4')));  //true
console.log(Boolean(Number('0')));  //false
console.log(Boolean(NaN));          //false
console.log(Boolean(NaN != NaN));   //false    I was wrong this statement is true
console.log(Infinity == Infinity);  //true
console.log(1/0 == 2/0);            //true
console.log(Boolean(2 * null));     //false
console.log(Boolean(2 + null));     //true
console.log(Boolean(7));            //true
console.log(Boolean(null || 7));    //true
console.log(Boolean('4'));          //true
console.log(Boolean(''));           //false

////////////////////////////
// Exercise 10.2 loops
////////////////////////////
// a. Make a loop that prints the numbers from 1 to 10
for(let i = 1; i <= 10; i++) {
    console.log(i);
}

// b. Make a loop that adds the numbers from 1 to 10
let sum = 0;
for(let i = 1; i <= 10; i++){
    sum+=i;
}
console.log(`SUM=${sum}`);

// c. Make a loop that computes 10!
let fact = 1;
for(let i = 10; i > 0; i--) {
    fact*= i;
}
console.log(`10!=${fact}`);

////////////////////////////
// Exercise 10.3 arrays
////////////////////////////
var a = [1, 2, 3, 5, 8]
// a. what is a[5]?
console.log(a[5]);  //undefined

// b. Make a loop that prints elements of a
// I guess old school style
for(let i = 0; i < a.length; i++) {
    console.log(`a[${i}] = ${a[i]}`);
}
console.log();
a.forEach((value, index) => {
    console.log(`a[${index}] = ${value}`);
})

// c. Make a loop that adds elements of a
let sum2 = a.reduce((accumulator, current) => {
    return accumulator+=current;
})
console.log(`SUM = ${sum2}`);

// d. Make a function that takes an array and returns sum
function calculateSum(arr) {
    let total = 0;
    for(let elem of arr) {
        total+=elem;
    }
    return total;
}
console.log(`calculateSum = ${calculateSum(a)}`)


// e. add element to a[8]
a[8] = 55;

// f. What is a[8]
console.log(a[8])   //55

// g. What is length of a
console.log(a.length)   //9

// h. What happens when we print a o console?  
a.forEach((elem) => {
    console.log(elem);  //skips undefinied ones
})

// i. What happens with loop from c?
let sum3 = a.reduce((accumulator, current) => {
    return accumulator+=current;
})
console.log(`SUM = ${sum3}`);


////////////////////////////
// Exercise 10.4
////////////////////////////

// a. Make a function factorial
function factorial(num) {
    if(num <= 1) return 1
    return num * factorial(num-1)
}

console.log(factorial(10))

function power(m, n) {
    if(n <=1) return m
    return m*power(m, n-1)
}
console.log(power(2,4))

////////////////////////////
// Exercise 10.5
////////////////////////////

// function that takes 2 arguments, m and n. if n is undefined return m! else return m to the power of n. 
function advFunction(m, n) {
    if(n == undefined) return factorial(m)
    else return power(m,n)
}
console.log(`m=2, n=5 = ${advFunction(2, 5)}`)
console.log(`m=10= ${advFunction(10)}`)