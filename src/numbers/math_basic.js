const GeneratedNumber = require('../domain/generated_number')
const NumberGenerator = require('../domain/number_generator')
const {decimal} = require('./round_numbers')

function* squares() {
    for (const obj of decimal.getGeneratorFunction()) {
        const number = obj.number
        if (number === 1) {
            continue
        }
        yield new GeneratedNumber(number * number, `square of the number ${number.toString()}`, 1.5)
    }
}

module.exports = {
    squares: new NumberGenerator(squares)
}