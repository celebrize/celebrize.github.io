import hexspeak from './hexspeak.js'
import {generatorToNumbers} from './spec_helper.js'

describe('hexspeak number generator', () => {
    test('generates ascending numbers', () => {
        const generator = hexspeak.getGeneratorFunction()
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
    test('it can reset', () => {
        const arr1 = generatorToNumbers(hexspeak, 100)
        const arr2 = generatorToNumbers(hexspeak, 100)
        expect(arr1).toEqual(arr2)
    })
    test('it shows the correct help text', () => {
        let series = hexspeak.getGeneratorFunction()
        const first = series.next().value
        expect(first.getHelpText()).toEqual('spells "odd" in hexspeak')
        const second = series.next().value
        expect(second.getHelpText()).toEqual('spells "ice" in hexspeak')
    })
})
