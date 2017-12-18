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
