const GeneratedNumber = require('../domain/generated_number')
const NumberGenerator = require('../domain/number_generator')

function* fibonacci() {
    let previous = 0
    let current = 1
    let index = 1
    while (true) {
        const oldPrevious = previous
        previous = current
        current = current + oldPrevious
        index++
        yield new GeneratedNumber(current, `${current} is the ${index}th Fibonacci number`, 3)
    }
}

module.exports = new NumberGenerator(fibonacci)