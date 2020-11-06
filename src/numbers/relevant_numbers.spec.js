const relevant_numbers = require('./relevant_numbers')
const {generatorToNumbers} = require('./spec_helper.js')

describe('relevant numbers', () => {
    test('generates ascending numbers', () => {
        const generator = relevant_numbers.getGeneratorFunction()
        let lastNumber = 0
        let idx = 0
        for (const value of generator) {
            expect(value.number).toBeGreaterThan(lastNumber)
            lastNumber = value.number
            idx++
            if (idx > 10000) {
                throw new Error("Aborting iteration, because generator generated too many numbers")
            }
        }
        expect(lastNumber).toBeGreaterThan(0) // should generate numbers
    })
    test('every number has a help text', () => {
        const generator = relevant_numbers.getGeneratorFunction()
        for (const value of generator) {
            expect(value.getHelpText()).toBeTruthy()
        }
    })
})
