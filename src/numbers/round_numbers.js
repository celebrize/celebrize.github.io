const GeneratedNumber = require('../domain/generated_number')
const NumberGenerator = require('../domain/number_generator')

function generatorForBase(base, helpFunc) {
    return new NumberGenerator(function* () {
        let number = 1
        let exponent = 0
        while (true) {
            const value = number * Math.pow(base, exponent)
            yield new GeneratedNumber(value, helpFunc ? helpFunc(value) : null)
            number++
            if (number >= base) {
                number = 1
                exponent++
            }
        }
    })
}

module.exports = {
    binary: generatorForBase(2, (i) => `[${i.toString(2)}]₂ is a round binary number`),
    octal: generatorForBase(8, (i) => `[${i.toString(8)}]₈ is a round octal number`),
    decimal: generatorForBase(10),
    hexadecimal: generatorForBase(16, i => `0x${i.toString(16).toUpperCase()} is a round hexadecimal number`),
}