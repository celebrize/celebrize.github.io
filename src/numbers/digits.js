const GeneratedNumber = require('../domain/generated_number')
const NumberGenerator = require('../domain/number_generator')

/* global BigInt */
function generatorForNumber(number, label) {
    return new NumberGenerator(function* () {
        let len = 3
        while (len <= number.length) {
            yield new GeneratedNumber(BigInt(number.substring(0, len)), `These are the first ${len} digits of ${label}`)
            len++
        }
    })
}

module.exports = {
    // @TODO: https://en.wikipedia.org/wiki/List_of_scientific_constants_named_after_people
    // @TODO: https://en.wikipedia.org/wiki/List_of_mathematical_constants
    pi: generatorForNumber("31415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679", "Pi"),
    e: generatorForNumber("271828182845904523536028747135266249775724709369995", "Euler's number"),
    goldenRatio: generatorForNumber("161803398874989484820458683436563811772030917980576286213544862270526046281890244970720720418939113748475", "the Golden ratio"),
}
