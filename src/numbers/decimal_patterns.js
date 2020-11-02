const GeneratedNumber = require('../domain/generated_number')
const NumberGenerator = require('../domain/number_generator')

function* repetition() {
    let length = 3
    let digit = 1
    while(true) {
        let number = 0
        for(let i=0; i<length; i++) {
            number = number * 10 + digit
        }

        yield new GeneratedNumber(number, "a string of repeating digits")

        digit++
        if (digit >= 10) {
            digit = 1
            length++
        }
    }
}

function* alteration() {
    let length = 4
    let digit1 = 1
    let digit2 = -1
    while(true) {
        digit2++
        if (digit2 >= 10) {
            digit2 = 0
            digit1++
            if (digit1 >= 10) {
                digit1 = 1
                length++
            }
        }

        if (digit1 === digit2) { continue }

        let number = 0
        
        for(let i=0; i<length; i++) {
            number = number * 10 + (i%2 === 0 ? digit1 : digit2)
        }

        yield new GeneratedNumber(number, "a string of alternating digits")
    }
}

function* streetAscending() {
    let length = 5
    let first = 1
    while (true) {
        let number = 0
        let currentDigit = first
        let remainingDigits = length
        while(remainingDigits > 0) {
            number = number * 10 + currentDigit
            remainingDigits--
            currentDigit = (currentDigit + 1) % 10
        }

        yield new GeneratedNumber(number, "a string of ascending digits")

        first = first + 1
        if (first >= 10) {
            first = 1
            length++
        }
    }
}

function* streetDescending() {
    let length = 5
    let first = 1
    while (true) {
        let number = 0
        let currentDigit = first
        let remainingDigits = length
        while(remainingDigits > 0) {
            number = number * 10 + currentDigit
            remainingDigits--
            currentDigit = (currentDigit + 9) % 10
        }

        yield new GeneratedNumber(number, "a string of descending digits")

        first = first + 1
        if (first >= 10) {
            first = 1
            length++
        }
    }
}

module.exports = {
    alteration: new NumberGenerator(alteration),
    repetition: new NumberGenerator(repetition),
    streetAscending: new NumberGenerator(streetAscending),
    streetDescending: new NumberGenerator(streetDescending),
}