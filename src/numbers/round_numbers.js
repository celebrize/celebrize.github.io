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
                gen_number.setLabel(labelFunc(value, exponent))
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

const decToSuper = (char) => {
    if (char === "1") {
        return "\u00B9"
    } else if (char === "2") {
        return "\u00B2"
    } else if (char === "3") {
        return "\u00B3"
    } else {
        const i = char.charCodeAt(0)
        return String.fromCodePoint(i + 0x2040)
    }
}

module.exports = {
    binary: generatorForBase(2, (_, exp) => `2${[...exp.toString()].map(c => decToSuper(c)).join("")}`, (i) => `a round binary number`),
    octal: generatorForBase(8, (i) => `[${i.toString(8)}]₈`, (i) => `a round octal number`),
    decimal: generatorForBase(10),
    hexadecimal: generatorForBase(16, i => `0x${i.toString(16).toUpperCase()}`, i => `a round hexadecimal number`),
}