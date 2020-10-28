const {decimal} = require('./round_numbers')

function* squares() {
    for (const obj of decimal()) {
        const number = obj.number
        if (number === 1) {
            continue
        }
        yield {
            number: number * number,
            help: `square of the number ${number.toString()}`
        }
    }
}

module.exports = {
    squares
}