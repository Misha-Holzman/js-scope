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
