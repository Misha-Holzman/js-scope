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
