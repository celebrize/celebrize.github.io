const {
    pi,
    e,
    goldenRatio,
} = require('./digits.js')
const {generatorToNumbers} = require('./spec_helper.js')

describe('pi digit generator', () => {
    test('generates correct, ascending numbers', () => {
        const arr = generatorToNumbers(pi, 9)
        expect(arr).toEqual([
            314n,
            3141n,
            31415n,
            314159n,
            3141592n,
            31415926n,
            314159265n,
            3141592653n,
            31415926535n,
        ])
    })
    test('it finally ends', () => {
        const arr = generatorToNumbers(pi, 999)
        expect(arr.length).toBe(99)
    })
    test('it can reset', () => {
        const arr1 = generatorToNumbers(pi, 100)
        const arr2 = generatorToNumbers(pi, 100)
        expect(arr1).toEqual(arr2)
    })
    test('it shows the correct help text', () => {
        let series = pi.getGeneratorFunction()
        const first = series.next().value
        expect(first.getHelpText()).toEqual("These are the first 3 digits of Pi")
        const second = series.next().value
        expect(second.getHelpText()).toEqual("These are the first 4 digits of Pi")
    })
})

describe('eulers number digit generator', () => {
    test('generates correct, ascending numbers', () => {
        const arr = generatorToNumbers(e, 4)
        expect(arr).toEqual([
            271n,
            2718n,
            27182n,
            271828n,
        ])
    })
    test('it finally ends', () => {
        const arr = generatorToNumbers(e, 999)
        expect(arr.length).toBe(49)
    })
    test('it can reset', () => {
        const arr1 = generatorToNumbers(e, 100)
        const arr2 = generatorToNumbers(e, 100)
        expect(arr1).toEqual(arr2)
    })
    test('it shows the correct help text', () => {
        let series = e.getGeneratorFunction()
        const first = series.next().value
        expect(first.getHelpText()).toEqual("These are the first 3 digits of Euler's number")
        const second = series.next().value
        expect(second.getHelpText()).toEqual("These are the first 4 digits of Euler's number")
    })
})

describe('golden ratio number digit generator', () => {
    test('generates correct, ascending numbers', () => {
        const arr = generatorToNumbers(goldenRatio, 7)
        expect(arr).toEqual([
            161n,
            1618n,
            16180n,
            161803n,
            1618033n,
            16180339n,
            161803398n,
        ])
    })
    test('it finally ends', () => {
        const arr = generatorToNumbers(goldenRatio, 999)
        expect(arr.length).toBe(103)
    })
    test('it can reset', () => {
        const arr1 = generatorToNumbers(goldenRatio, 100)
        const arr2 = generatorToNumbers(goldenRatio, 100)
        expect(arr1).toEqual(arr2)
    })
    test('it shows the correct help text', () => {
        let series = goldenRatio.getGeneratorFunction()
        const first = series.next().value
        expect(first.getHelpText()).toEqual("These are the first 3 digits of the Golden ratio")
        const second = series.next().value
        expect(second.getHelpText()).toEqual("These are the first 4 digits of the Golden ratio")
    })
})
