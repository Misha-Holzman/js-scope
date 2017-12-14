[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# JS-Blocks-Scope-Closures

## Prerequisetes 
- [js-reference-types](https://git.generalassemb.ly/ga-wdi-boston/js-reference-types)

## Objectives
- Explain what a block is
- Describe the difference between global and local scope in JavaScript.
- Identify which part(s) of JavaScript create new scope.
- Identify which variables are accessible in various scopes
- Create a closure 
- Explain why a closure is beneficial 

## Preparation

1.  Fork and clone this repository.
 [FAQ](https://github.com/ga-wdi-boston/meta/wiki/ForkAndClone)
1.  Create a new branch, `training`, for your work.
1.  Checkout to the `training` branch.
1.  Install dependencies with `npm install`.


### Discussion

One best practice when coding is to only allow a piece of code to access the things it needs to access, and nothing more. To reduce interdependency and lower [coupling](https://en.wikipedia.org/wiki/Coupling_%28computer_programming%29), we can separate code into groups, called blocks, and create different containers to hold our variables, called scope.

Why might software developers want to keep certain objects and data separate from other parts of an application?

### Blocks

A Block statement is used to group code together. To create a block, we use a pair of curly braces:
```
{
  // Statements
}
```

Optionally, a block can be labeled as a visual identifier or as a target for [break](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/break). 

Blocks are also used with functions, conditionals and loops:

```JS
if ( true || false ) { /* within the block, body of conditional */  }
for ( let i = 0; ... ) { /* within the block, body of loop */ }
while ( i < num ... ) { /* within the block, body of loop */ }
function ( arg1, arg2 ) { /* within the block, body of function */ }
```

In addition to grouping code together, blocks create a new scope for the variables defined within the block.

### Scope

When we use blocks, we create a new scope for the variables defined within the block. Within a block, if we are using the ES6 `let` and `const` variables (which you should), these variables have _block scope_, meaning the variables defined within the block are limited in scope to the block in which it is defined:

```JS
let name = 'Danny'
{
  let name = 'Caleb'
}
console.log(name) // prints 'Danny'

// name = 'Caleb' is limited in scope to the block in which it is defined
```

You can think of scope as a collection of nested boxes. Each scope acts as a container in which variables and functions can be declared. while JavaScript is executing code within a scope, it only has access to identifiers declared in the current scope and higher scopes, the parent and global scopes.

Scopes in JavaScript come in two flavors: block scope and function scope. When you create a function, you isolate the scope within that function. Within the function, you can access the local scope and the parent scopes, but outside the function, you cannot see or access the scope within the function. The function's contents are private and are accessible only within that function.

*Caution: if using `var`:*
If we are using `var`, the variable will *not* have block scope. Those variables are scoped to the containing function or script, and the value of those variables defined with *var* persist beyond the block itself. For this reason, we always use `let` and `const` so that we do not get any unexpected behavior with our variables.

*We can create scope by using functions and blocks:*
```JS
{ /* creates block scope */ }

if { /* creates block scope */ }
for ( /* ... */ ) { /* creates block scope */ }
while ( /* ... */ ) { /* creates block scope */ }
function ( /* ... */ ) { /* creates a function scope */ }
```

##### Demo - `global and local scope`

Let's see some more code examples of scopes.

Remember that block scope means our different scopes are separated by blocks `{ }`.

```js
// I am not inside a block
if (true) {
  // i am inside a block
}
// I am not inside a block
```

*NOT* objects but blocks.
```js
if (true) {
  // i am inside a block
}

let obj = {
  prop1: "I am not inside a block",
  prop2: "This is an object silly"
}
```

The outer most scope is the `global scope` and all inner scopes are considered
`local scopes`.

```js
// global scope
if (true) {
  // local scope
}
// global scope
```

Variables are accessible within the scope they are declared.

```js
// global scope
if (true) {
  // local scope
  let x = 1  // what would happen if `var` were used instead?
  console.log(x)  // 1
  // When should we use `console` functions?
}
// global scope
console.log(x)  // ReferenceError: x is not defined
```

They are accessible to any inner scopes (child scopes).

```js
// global scope
let x = 1

if (true) {
  // local scope
  x = 2
  console.log(x)  // 2
}
// global scope
console.log(x)  // 2
```

But not to the scopes above them (parent scopes).

```js
// global scope
let x = 1

if (true) {
  // local scope
  let y = x
  console.log(y)  // 1
}
// global scope
console.log(x)  // 1
console.log(y)  // ReferenceError: y is not defined
```

Variables are not accessible from sibling scopes.

```js
if (true) {
  // local scope of 1st sibling
  let a = 1
  console.log(a) // 1
}

if (true) {
  // local scope of 2nd sibling
  console.log(a) // ReferenceError: a is not defined
}
```

Different scopes can have variables that are declared with the same name and
they do not conflict or know about each other.

```js
// global scope
const x = 1
console.log(x)  // 1

if (true) {
  // local scope
  const x = 2
  console.log(x)  // 2
}
// global scope
console.log(x)  // 1
```

So that means a variable declared in the global scope is accessible by all of
the scopes we create and a variable declared in a local scope is only
accessible to itself and its child scopes.

##### Code Along - `debugging variable scope`

```js
// global scope
let a = 1

if (true) {
  // local scope of 1st nested if statement
  let b = 2

  if (true) {
    // local scope of 2nd nested if statement
    let c = 3
    console.log(a) // 1
    console.log(b) // 2
    console.log(c) // 3
  }

  // local scope of 1st nested if statement
  console.log(a) // 1
  console.log(b) // 2
  console.log(c) // ReferenceError: c is not defined
}

// global scope
console.log(a) // 1
console.log(b) // ReferenceError: b is not defined
console.log(c) // ReferenceError: c is not defined
```

Conditions are just 1 example of block scope.
Loops are another example of block scope.

```js
while (true) { // don't run this
  let a = 1
  console.log(a) // 1
}
console.log(a) // ReferenceError: a is not defined
```

For Loops still have block scope even though the syntax is different.

```js
for (let i = 1; i < 2; i++) {
  console.log(i) // 1
}
console.log(i) // ReferenceError: i is not defined
```

Functions are another example of block scope.

```js
const anyFunction = function() {
  let a = 1
  console.log(a) // 1
}

console.log(a) // ReferenceError: a is not defined
```

The scope of our parameters are within the function block as well

```JS
const print = function(a) {
  console.log(a)
}

print(1) // 1
console.log(a) // ReferenceError: a is not defined
```

As we have seen, utilizing scope provides great utility. We get more control over who can access and manipulate our data. We can use scope to declare a variable without polluting the global namespace. Scoping provides a way to encapsulate data and prevent other parts of our applciation from accessing variables declared within a certain scope.

When you are not familiar with the rules of scope, it will be a common source of bugs and frustration. By being aware of how scope is created, and by using scope effectively, you will write code that is more efficient, organized and less error prone.

### Closures

We know that functions create a new lexical scope. Imagine you wanted to capture the state of this scope at a specific moment in time, and then access it later:

```JS
const num = 1
const add = function(num2){
  return num + num2
}
// This function closes around the scope and always has access to num.

add(5) // Access the lexical scope of add() that was available when the function was defined
// -> 6

add(2)
// -> 3
```

This combination of a function and it's lexical scope is called a _closure_. By creating a closure, we can use a function to close over the current local scope and access it at a later time:

Here's another example that generates a secret message:

```JS
let sayMessage // this is undefined for now, we'll assign something to it later

if (true) { // this block will run no matter what
  const secretMsg = 'This is a secret just for you' // this exists only inside the scope of this block ... right?

  sayMessage = function (name) {
    console.log(`${name}: ${secretMsg}`)
  }
}

console.log(secretMsg) // logs undefined

sayMessage('Jess') // gets access to the lexical scope that was present when the function was defined
// -> 'Jess: This is a secret just for you'

sayMessage('Chris')
// -> 'Chris: This is a secret just for you'

// What scope is the `secretMsg` defined in? What about `name`? Is the `secretMsg` that secret afterall?
```

Notice how each instance of `sayMessage()` is unique, but also shares the same value of `secretMsg`.

In JavaScript, when you create a function, you are also creating a closure, which is a combination of a function and the lexical (local) scope (or environment) in which that function was declared.  When you later call the function, the function maintains a reference to its lexical envrionment that was present when that function was declared.

Thinking about a real world example, let's imagine a toy factory that produces different kinds of toys. We want to keep track of the number of each type of toy produced in the toy factory. To do that, we need a generic function that holds data common to each type of toy. This generic function will return a more specialized function that we will use to "build" a specific toy. This is a design pattern for creating objects called the [Factory pattern](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#factorypatternjavascript).

We are going to create a parent function and an inner function. The inner function is going to return a function that we can use later on. This returned function is forever going to get access to the scope of the parent function, because it closed around the scope when the function was defined.

```JS
const toyFactory = function(typeOfToy) {
  let numToy = 1
  return function() {
    console.log('This is ' + typeOfToy + ' number ' + numToy)
    numToy++
  }
}

const yoyoFactory = toyFactory('yoyo')
const tamagotchiFactory = toyFactory('tamagotchi')

yoyoFactory()
yoyoFactory()
tamagotchiFactory() // what is the value of numToy?

// Each toy factory gets access to its own version of the parent scope
```
By using closures, we gain the ability to write code that parallels object-oriented design, creating objects that have data associated its methods. We are able to encapsulate data within an object, and hide data from other parts of our application.

### Lab: Diagramming Scope

Diagram scope for the following code. Work in pairs. When you're done, compare your work to another pair's. Discuss any differences and correct any mistakes. Then, answer the following questions together.

```JS
const autoMake = 'Ford'
const autoModel = 'Stang'
const price = 2368
const baseYear = 1964
const inflation = 0.05

function showAuto(year){
  function autoInfo(){
    currentPrice = price * Math.pow((1 + inflation), year-baseYear) 
    console.log('Auto is a ' + year + ' ' + autoMake + ' ' + autoModel + ', it\'s price is ' + currentPrice + '$')
  }

  autoInfo()
}

showAuto(1979)
```

1. Name any and all scopes from which `autoModel` is available. ("Available" is another word for "defined".)
1. Is `autoInfo` available from the global scope? Can you execute `autoInfo()` from there?
1. Is `price` visible from within `showAuto`?
1. Does a 1979 model know anything about any other year's `currentPrice`? 
1. Name any and all scopes from which `year` is available. 

### Summary

In JavaScript, we use scope to encapsulate data and hide it from other parts of our application. The most common way to create a new scope is with a function. We can also create scope using a block. By using scope, we can keep our code organized, manageable, avoid variable name collision, and keep the global namespace clean.

#### Best Practices:
- Don't declare or depend on global state
- Apply the [Principle of Least Privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege): Allow code to access the information and resources that are necessary for it to run, and nothing more.
  - Encapsulate code as much as possible in scope using functions and blocks
- Never use `var` (prefer `const` over `let`, but never use `var`)
- Never depend on scope state
- Always pass in state as an argument when it is needed

### Additional Resources
- [MDN - Blocks](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/block)
- [MDN - Scope](https://developer.mozilla.org/en-US/docs/Glossary/Scope)
- [You Don't Know JS - Chapter 3](https://en.wikipedia.org/wiki/Principle_of_least_privilege)
- [MDN - Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
- [Advanced-Javascript](https://git.generalassemb.ly/ga-wdi-boston/advanced-javascript)
- [Design Patterns](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#factorypatternjavascript)

## [License](LICENSE)

1.  All content is licensed under a CC­BY­NC­SA 4.0 license.
1.  All software code is licensed under GNU GPLv3. For commercial use or
    alternative licensing, please contact legal@ga.co.
