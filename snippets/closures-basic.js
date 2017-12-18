const num = 1
const add = function (num2) {
  return num + num2
}
// This function closes around the scope and always has access to num.

add(5) // Access the lexical scope of add() that was available when the function was defined
// -> 6

add(2)
// -> 3
