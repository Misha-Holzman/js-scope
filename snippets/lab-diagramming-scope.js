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
