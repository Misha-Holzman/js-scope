[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# JS-Scope

## Prerequisetes 
- [js-reference-types](https://git.generalassemb.ly/ga-wdi-boston/js-reference-types)

## Objectives
- Explain what a block is.
- Describe the difference between global and local scope in JavaScript.
- Identify which part(s) of JavaScript create new scope.
- Identify which variables are accessible in various scopes.
- Create a closure.
- Explain why a closure is beneficial. 

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
<!-- start code block file="snippets/block.js" -->
```js
{
  // Statements
}
```
<!-- end code block -->


Optionally, a block can be labeled as a visual identifier or as a target for [break](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/break). 

Blocks are also used with functions, conditionals and loops:

<!-- start code block file="snippets/block-examples.js" -->
```js
if ( /* true || false */ ) { /* within the block, body of conditional */  }
for ( /* let i = 0; ...*/ ) { /* within the block, body of loop */ }
while ( /* i < num ... */ ) { /* within the block, body of loop */ }
function ( /* arg1, arg2 */ ) { /* within the block, body of function */ }

```
<!-- end code block -->

In addition to grouping code together, blocks create a new scope for the variables defined within the block.

### Scope

When we use blocks, we create a new scope for the variables defined within the block. Within a block, if we are using the ES6 `let` and `const` variables (which you should), these variables have _block scope_, meaning the variables defined within the block are limited in scope to the block in which it is defined:

#### Demo - creating block scope

<!-- start code block file="snippets/block-scope.js" -->
```js
const name = 'Danny'
{
  const name = 'Caleb'
}
console.log(name) // prints 'Danny'

// name = 'Caleb' is limited in scope to the block in which it is defined
```
<!-- end code block -->

You can think of scope as a collection of nested boxes. Each scope acts as a container in which variables and functions can be declared. while JavaScript is executing code within a scope, it only has access to identifiers declared in the current scope and higher scopes, the parent and global scopes.

Scopes in JavaScript come in two flavors: block scope and function scope. When you create a function, you isolate the scope within that function. Within the function, you can access the local scope and the parent scopes, but outside the function, you cannot see or access the scope within the function. The function's contents are private and are accessible only within that function.

_**Caution if using `var`**:_

If we are using `var`, the variable will *not* have block scope. Those variables are scoped to the containing (parent) function or script, and the value of those variables defined with *var* persist beyond the block itself. For this reason, we always use `let` and `const` so that we do not get any unexpected behavior with our variables.

**We can create scope by using functions and blocks:**
<!-- start code block file="snippets/scope-creation.js" -->

```js

{ /* creates block scope */ }

if { /* creates block scope */ }
for ( /* ... */ ) { /* creates block scope */ }
while ( /* ... */ ) { /* creates block scope */ }
function ( /* ... */ ) { /* creates a function scope */ }

```

<!-- end code block -->

#### Demo - global and local scope

Let's see some more code examples of scopes.

Remember that block scope means our different scopes are separated by blocks `{ }`.

<!-- start code block file="snippets/block-scope2.js" -->
```js
// I am not inside a block
if (true) {
  // i am inside a block
}
// I am not inside a block
```
<!-- end code block -->

*NOT* objects but blocks.

<!-- start code block file="snippets/block-not-object.js" -->
```js
if (true) {
  // i am inside a block
}

const obj = {
  prop1: 'I am not inside a block',
  prop2: 'This is an object silly'
}
```
<!-- end code block -->

The outer most scope is the _global scope_ and all inner scopes are considered
_local scopes_:

<!-- start code block file="snippets/global-local-scope.js" -->
```js
// global scope
if (true) {
  // local scope
}
// global scope
```
<!-- end code block -->

Variables are accessible within the scope they are declared:

<!-- start code block file="snippets/global-local-scope-vars.js" -->

```js
// global scope
if (true) {
  // local scope
  const x = 1  // what would happen if `var` were used instead?
  console.log(x)  // 1
  // When should we use `console` functions?
}
// global scope
console.log(x)  // ReferenceError: x is not defined
```
<!-- end code block -->

Variables are accessible to any inner scopes (child scopes):

<!-- start code block file="snippets/child-scope-vars.js" -->
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
<!-- end code block -->

But not to the scopes above them (parent scopes):

<!-- start code block file="snippets/parent-scope-vars.js" -->
```js
// global scope
const x = 1

if (true) {
  // local scope
  const y = x
  console.log(y)  // 1
}
// global scope
console.log(x)  // 1
console.log(y)  // ReferenceError: y is not defined
```
<!-- end code block -->

Variables are not accessible from sibling scopes:

<!-- start code block file="snippets/sibling-scope.js" -->
```js
if (true) {
  // local scope of 1st sibling
  const a = 1
  console.log(a) // 1
}

if (true) {
  // local scope of 2nd sibling
  console.log(a) // ReferenceError: a is not defined
}
```
<!-- end code block -->

Different scopes can have variables that are declared with the same name and
they do not conflict or know about each other.

<!-- start code block file="snippets/different-scope-vars.js" -->
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
<!-- end code block -->

So that means a variable declared in the global scope is accessible by all of
the scopes we create and a variable declared in a local scope is only
accessible to itself and its child scopes.

#### Code Along - debugging variable scope

Within `bin/scope-practice.js`, let's get some practice creating global and nested block scopes.

<!-- start code block file="snippets/debugging-variable-scope.js" -->

```js
// global scope
const a = 1

if (true) {
  // local scope of 1st nested if statement
  const b = 2

  if (true) {
    // local scope of 2nd nested if statement
    const c = 3
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
<!-- end code block -->

Conditions are just 1 example of block scope.
Loops are another example of block scope.

<!-- start code block file="snippets/scope-creation-examples.js" -->

```js
while (true) { // don't run this
  const a = 1
  console.log(a) // 1
}
console.log(a) // ReferenceError: a is not defined

//  For Loops still have block scope even though the syntax is different.

for (let i = 1; i < 2; i++) {
  console.log(i) // 1
}
console.log(i) // ReferenceError: i is not defined

// Functions are another example of block scope.

const anyFunction = function () {
  const a = 1
  console.log(a) // 1
}

console.log(a) // ReferenceError: a is not defined

// The scope of our parameters are within the function block as well

const print = function (a) {
  console.log(a)
}

print(1) // 1
console.log(a) // ReferenceError: a is not defined
```
<!-- end code block -->

As we have seen, utilizing scope provides great utility. We get more control over who can access and manipulate our data. We can use scope to declare a variable without polluting the global namespace. Scoping provides a way to __encapsulate__ data and prevent other parts of our applciation from accessing variables declared within a certain scope.

When you are not familiar with the rules of scope, it will be a common source of bugs and frustration. By being aware of how scope is created, and by using scope effectively, you will write code that is more efficient, organized and less error prone.

### Closures

We know that functions create a new scope, meaning that variables defined within a function are not accessible outside of a function. Going further, nested functions also contain the scope of parent functions. But you can't go the other direction, saying parent functions have access to child function scopes.

We can describe this as _lexical scoping_ or _static scoping_, when a variable defined within a function gets access to the function scope. This lexical scope is defined by the location where the variable is declared.

#### Demo - creating a closure around a variable

Imagine you wanted to capture the state of this lexical scope at a specific moment in time, and then access it later:

<!-- start code block file="snippets/closures-basic.js" -->

```js
const num = 1
const add = function (num2) {
  return num + num2
}
// The add() function closes around the function scope
// and always has access to the variable num.

add(5) // Access the lexical scope of add() that was available when the function was defined
// -> 6

add(2)
// -> 3
```
<!-- end code block -->

This combination of a function and it's lexical scope is called a _closure_. By creating a closure, we can use a function to close over the current scope and access it at a later time.

#### Code Along - creating a closure

Here's another example that generates a secret message:

<!-- start code block file="snippets/closures-basic-2.js" -->

```js
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

// Notice how each instance of `sayMessage()` is unique, but also shares the same value of `secretMsg`.
```
<!-- end code block -->

In JavaScript, when you create a function, you are also creating a closure, which is a combination of a function and the lexical (local) scope (or environment) in which that function was declared.  When you later call the function, the function maintains a reference to its lexical envrionment that was present when that function was declared.

#### Demo - Factory function

Thinking about a real world example, let's imagine a toy factory that produces different kinds of toys. We want to keep track of the number of each specific type of toy produced in the entire toy factory. To do that, we need a generic function that holds data common to each type of toy. This generic function will return a more specialized function that we will use to "build" a specific toy. This is a design pattern for creating objects called the [Factory pattern](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#factorypatternjavascript).


We are going to create a parent function and a nested inner function. Invoking the parent function will return an inner function that we can use later on.

<details><summary>Why is this an example of a closure?
<br>
</summary>
This returned function is forever going to get access to the scope of the parent function, because it closed around the scope when the function was defined.
</details>
<details>
<summary>Where should we declare the overall toy counter variable, that keeps track of how many toys are produced in each specific toy factory?<br /></summary>
We should store common data like a counter in the parent function's scope, so that all child functions can have access to the counter variable.
</details>
<details>
<summary>Where should we increment the toy counter? Why?<br /></summary>
We should increment the toy counter in the specific toy factory instance, because we want each toy counter to be unique to that specific kind of toy.
</details>

<!-- start code block file="snippets/factory-pattern.js" -->
```js
const toyFactory = function (typeOfToy) {
  let numToy = 1
  return function () {
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
<!-- end code block -->

By using closures, we gain the ability to write code that parallels object-oriented design, creating objects that have data associated with their methods. We are able to encapsulate data within an object, and hide data from other parts of our application.

### Lab: Diagramming Scope

Diagram scope for the following code. Work in pairs. When you're done, compare your work to another pair's. Discuss any differences and correct any mistakes. Then, answer the following questions together.

<!-- start code block file="snippets/lab-diagramming-scope.js" -->
```js
const autoMake = 'Ford'
const autoModel = 'Stang'
const price = 2368
const baseYear = 1964
const inflation = 0.05

const showAuto = function (year) {
  const autoInfo = function () {
    const currentPrice = price * Math.pow((1 + inflation), year - baseYear)
    console.log(`Auto is a ${year} ${autoMake} ${autoModel}', it's price is ${currentPrice}$`)
  }

  autoInfo()
}

showAuto(1979)
```
<!-- end code block -->

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
- Closures
  - [Learn JS Closures](https://medium.freecodecamp.org/lets-learn-javascript-closures-66feb44f6a44)
  - [Closures in Plain English](https://medium.freecodecamp.org/whats-a-javascript-closure-in-plain-english-please-6a1fc1d2ff1c)
  - [Closures Explained](https://medium.freecodecamp.org/javascript-closures-explained-by-mailing-a-package-4f23e9885039)
- [Advanced-Javascript](https://git.generalassemb.ly/ga-wdi-boston/advanced-javascript)
- [Design Patterns](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#factorypatternjavascript)

## [License](LICENSE)

1.  All content is licensed under a CC­BY­NC­SA 4.0 license.
1.  All software code is licensed under GNU GPLv3. For commercial use or
    alternative licensing, please contact legal@ga.co.
