# Javascript refresher for NodeJS

Here you can find the concepts that we should refresh before starting with NodeJS. Understanding and praticing these concepts is essential to understand the next classes and topics.

## Javascript short summary

- Weakly typed language - you don't have to declare the type of a variable when you declare it. The type will be inferred from the value that you assign to it.
Example:

```javascript
let a = 5; // a is a number
let b = 'hello'; // b is a string
```

- Object-oriented - everything is an object, even functions. You can create objects using the `new` keyword.
Example of creating a new function:

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}

let person1 = new Person('John', 25);

// example of extending the prototype of a function
Person.prototype.sayHello = function() {
  console.log('Hello, my name is ' + this.name);
}

person1.sayHello(); // Hello, my name is John

```

- Versatile - you can use javascript to create web applications, mobile applications, desktop applications, games, etc.


## Variables

Variables are used to store data. You can declare a variable using the `let` keyword.

```javascript
let a = 5;
let b = 'hello';
let c = true;
```

### Ways to declare a variable

- `let` - you can change the value of the variable
- `const` - you can't change the value of the variable - If something doesn't need to change, it's better to use `const` instead of `let`!
- `var` - you can change the value of the variable, but it has some issues, so it's better to use `let` instead

Issues of using var instead of let:
var is function scoped, while let is block scoped. This means that if you declare a variable with var inside a block, it will be available outside the block. This javascript behavior is called **hoisting**.

```javascript
if (true) {
  var a = 5;
}

console.log(a); // 5
```

## Functions

Functions are used to group code that you want to reuse. You can declare a function using the `function` keyword.

```javascript
function sayHello() {
  console.log('Hello');
}
```

You can also declare a function using an arrow function:

```javascript
let sayHello = () => {
  console.log('Hello');
}
```

`this` keyword difference between arrow functions and regular functions:

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.sayHello = function() {
    console.log('Hello, my name is ' + this.name);
  }
}

let person1 = new Person('John', 25);
person1.sayHello(); // Hello, my name is John

let sayHello = () => {
  console.log('Hello, my name is ' + this.name);
}

let person2 = {
  name: 'John',
  age: 25,
  sayHello: sayHello
}

person2.sayHello(); // Hello, my name is undefined
```

This happens because arrow functions don't have their own `this` keyword. They inherit the `this` keyword from the parent scope.


## Objects

Objects are used to store multiple values. You can create an object using the `{}` syntax.

```javascript
const person = {
  name: 'John',
  'last-name': 'Doe',
  age: 25,
  sayHello: function() {
    console.log('Hello, my name is ' + this.name);
  }
}
```

You can access the properties of an object using the `.` syntax:

```javascript
console.log(person.name); // John
```

You can also access the properties of an object using the `[]` syntax:

```javascript
console.log(person['last-name']); // Doe
```

You can add new properties to an object using the `.` syntax:

```javascript
person.city = 'Lisbon';
```

Even though person is declared as a `const`, you can change the properties of the object. You can't change the object itself, but you can change its properties. This happens because the object is stored in memory and the `const` keyword only prevents the variable from being reassigned.

### Object methods

- `Object.keys(person)` - returns an array with the keys of the object
- `Object.values(person)` - returns an array with the values of the object
- `Object.entries(person)` - returns an array with the entries of the object

Full list at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object

## Arrays

Arrays are used to store multiple values. You can create an array using the `[]` syntax.

```javascript
const numbers = [1, 2, 3, 4, 5];
```

You can access the elements of an array using the `[]` syntax:

```javascript
console.log(numbers[0]); // 1
```

You can add new elements to an array using the `push` method:

```javascript
numbers.push(6);
```

You can remove elements from an array using the `pop` method:

```javascript
numbers.pop();
```

Full list of array methods at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

## Loops

Loops are used to execute a block of code multiple times. You can create a loop using the `for` keyword.

```javascript
for (let i = 0; i < 5; i++) {
  console.log(i);
}
```

You can also create a loop using the `while` keyword:

```javascript
let i = 0;

while (i < 5) {
  console.log(i);
  i++;
}
```

## Conditionals

Conditionals are used to execute a block of code if a condition is true. You can create a conditional using the `if` keyword.

```javascript
let age = 25;


if (age >= 18) {
  console.log('You are an adult');
} else {
  console.log('You are a child');
}
```

You can also create a conditional using the `switch` keyword:

```javascript
let day = 'Monday';

switch (day) {
  case 'Monday':
    console.log('It is Monday');
    break;
  case 'Tuesday':
    console.log('It is Tuesday');
    break;
  default:
    console.log('It is another day');
}
```

## Classes

Classes are used to create objects. You can create a class using the `class` keyword.

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayHello() {
    console.log('Hello, my name is ' + this.name);
  }
}

let person1 = new Person('John', 25);
person1.sayHello();
```


## Spread and rest operators

The spread operator is used to expand an array or an object. You can use the spread operator to create a new array or object with the elements of the original array or object.

```javascript
let numbers = [1, 2, 3, 4, 5];
let newNumbers = [...numbers, 6, 7, 8, 9, 10];
```

The rest operator is used to collect the remaining elements of an array or an object. You can use the rest operator to create a new array or object with the remaining elements of the original array or object.

```javascript
let [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(rest); // [3, 4, 5]
```

## Destructuring

Destructuring is used to extract values from an array or an object. You can use destructuring to create variables from the elements of an array or the properties of an object.

```javascript
let numbers = [1, 2, 3, 4, 5];
let [first, second, ...rest] = numbers;
console.log(first); // 1
console.log(second); // 2
console.log(rest); // [3, 4, 5]
```

```javascript
let person = {
  name: 'John',
  age: 25,
  city: 'Lisbon'
}

let {name, age, city} = person;

console.log(name); // John
console.log(age); // 25
console.log(city); // Lisbon
```

## Callbacks

Callbacks are used to handle asynchronous operations. You can create a callback function and pass it as an argument to another function.

```javascript
function doSomething(callback) {
  setTimeout(() => {
    callback('Success');
  }, 1000);
}

doSomething((value) => {
  console.log(value); // Success
});
```

## Promises

Promises are used to handle asynchronous operations. You can create a promise using the `Promise` constructor.

```javascript

let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Success');
  }, 1000);
});

promise.then((value) => {
  console.log(value); // Success
});

```
## Async/await

Async/await is used to handle asynchronous operations. You can create an async function using the `async` keyword and use the `await` keyword to wait for the result of a promise.

```javascript

let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Success');
  }, 1000);
});

let asyncFunction = async () => {
  let value = await promise;
  console.log(value); // Success
}

asyncFunction();

```

## Template literals

Template literals are used to create strings. You can create a template literal using the `` syntax.

```javascript
let name = 'John';
let age = 25;

let message = `Hello, my name is ${name} and I am ${age} years old`;
console.log(message); // Hello, my name is John and I am 25 years old
```

## Modules in NodeJS

In NodeJS, you can use the `require` function to import modules. You can create a module using the `module.exports` object.

```javascript
// myModule.js

module.exports = {
  sayHello: function() {
    console.log('Hello');
  }
}
```

```javascript
// index.js

let myModule = require('./myModule');

myModule.sayHello(); // Hello
```
