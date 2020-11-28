import GeneratedNumber from '../domain/generated_number'
import NumberGenerator from '../domain/number_generator'

const repetition = new NumberGenerator(function*() {
    let length = 2
    let digit = 1
    while(true) {
        let number = 0
        for(let i=0; i<length; i++) {
            number = number * 10 + digit
        }

        yield new GeneratedNumber(number, "a string of repeating digits", 1.1)

        digit++
        if (digit >= 10) {
            digit = 1
            length++
        }
    }
})

const alteration = new NumberGenerator(function*() {
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

        yield new GeneratedNumber(number, "a string of alternating digits", 2)
    }
})

const streetAscending = new NumberGenerator(function*() {
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

        yield new GeneratedNumber(number, "a string of ascending digits", first === 1 ? 1 : 1.5)

        first = first + 1
        if (first >= 10) {
            first = 1
            length++
        }
    }
})

const streetDescending = new NumberGenerator(function*() {
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

        yield new GeneratedNumber(number, "a string of descending digits", length === first || length - 1 === first ? 1 : 1.5)

        first = first + 1
        if (first >= 10) {
            first = 1
            length++
        }
    }
})

export {
    alteration,
    repetition,
    streetAscending,
    streetDescending,
}