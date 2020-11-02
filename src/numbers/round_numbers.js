const GeneratedNumber = require('../domain/generated_number')
const NumberGenerator = require('../domain/number_generator')

function generatorForBase(base, labelFunc, helpFunc) {
    return new NumberGenerator(function* () {
        let number = 1
        let exponent = 0
        while (true) {
            const value = number * Math.pow(base, exponent)
            const gen_number = new GeneratedNumber(value, helpFunc ? helpFunc(value) : null)
            if(labelFunc) {
                gen_number.setLabel(labelFunc(value))
            }
            yield gen_number

            number++
            if (number >= base) {
                number = 1
                exponent++
            }
        }
    })
}

module.exports = {
    binary: generatorForBase(2, (i) => `[${i.toString(2)}]₂`, (i) => `a round binary number`),
    octal: generatorForBase(8, (i) => `[${i.toString(8)}]₈`, (i) => `a round octal number`),
    decimal: generatorForBase(10),
    hexadecimal: generatorForBase(16, i => `0x${i.toString(16).toUpperCase()}`, i => `a round hexadecimal number`),
}