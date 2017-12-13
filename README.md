[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# JS-Scope-Blocks-Closures

## Objectives
- Explain what a block is
- Describe the difference between global and local scope in JavaScript.
- Identify which part(s) of JavaScript create new scope.
- Identify which variables are accessible in various scopes
- Create a closure 
- Explain why a closure is beneficial 

### Blocks
{ /* creates block scope */ }

if { /* creates block scope */ }
for ( /* ... */ ) { /* creates block scope */ }
while ( /* ... */ ) { /* creates block scope */ }
function ( /* ... */ ) { /* creates block scope, and something else */ }

### Scope

As we have seen, when you create a function, you isolate the scope within that function. Within the function, you can access the local scope and the parent scopes, but outside the function, you cannot see or access the scope within the function. The function's contents are private and are accessible only within that function.

### Closures

### Summary

#### Best Practices:
- don't declare or depend on global state
- encapsulate code as much as possible in functions
- encapsulate functions in objects when it makes sense
- never use var (prefer const over let, but never use var)
- never depend on scope state
- always pass in state as an argument when it is needed

## [License](LICENSE)

1.  All content is licensed under a CC­BY­NC­SA 4.0 license.
1.  All software code is licensed under GNU GPLv3. For commercial use or
    alternative licensing, please contact legal@ga.co.
