const {
    alteration,
    repetition,
    streetAscending,
    streetDescending,
} = require('./decimal_patterns.js')
const {generatorToNumbers} = require('./spec_helper.js')

describe('street ascending generator', () => {
    test('generates correct, ascending numbers', () => {
        const arr = generatorToNumbers(streetAscending, 12)
        expect(arr).toEqual([
            12345,
            23456,
            34567,
            45678,
            56789,
            67890,
            78901,
            89012,
            90123,
            123456,
            234567,
            345678,
        ])
    })
    test('it can reset', () => {
        const arr1 = generatorToNumbers(streetAscending, 100)
        const arr2 = generatorToNumbers(streetAscending, 100)
        expect(arr1).toEqual(arr2)
    })
    test('it has a help text', () => {
        let series = streetAscending.getGeneratorFunction()
        const first = series.next().value
        expect(first.getHelpText()).toBeDefined()
    })
})

describe('street descending generator', () => {
    test('generates correct, ascending numbers', () => {
        const arr = generatorToNumbers(streetDescending, 12)
        expect(arr).toEqual([
            10987,
            21098,
            32109,
            43210,
            54321,
            65432,
            76543,
            87654,
            98765,
            109876,
            210987,
            321098,
        ])
    })
    test('it can reset', () => {
        const arr1 = generatorToNumbers(streetDescending, 100)
        const arr2 = generatorToNumbers(streetDescending, 100)
        expect(arr1).toEqual(arr2)
    })
    test('it has a help text', () => {
        let series = streetDescending.getGeneratorFunction()
        const first = series.next().value
        expect(first.getHelpText()).toBeDefined()
    })
})

describe('repetition generator', () => {
    test('generates correct, ascending numbers', () => {
        const arr = generatorToNumbers(repetition, 21)
        expect(arr).toEqual([
            11,
            22,
            33,
            44,
            55,
            66,
            77,
            88,
            99,
            111,
            222,
            333,
            444,
            555,
            666,
            777,
            888,
            999,
            1111,
            2222,
            3333,
        ])
    })
    test('it can reset', () => {
        const arr1 = generatorToNumbers(repetition, 100)
        const arr2 = generatorToNumbers(repetition, 100)
        expect(arr1).toEqual(arr2)
    })
    test('it has a help text', () => {
        let series = repetition.getGeneratorFunction()
        const first = series.next().value
        expect(first.getHelpText()).toBeDefined()
    })
})

describe('alteration generator', () => {
    test('generates correct, ascending numbers', () => {
        const arr1 = generatorToNumbers(alteration, 12)
        expect(arr1).toEqual([
            1010,
            1212,
            1313,
            1414,
            1515,
            1616,
            1717,
            1818,
            1919,
            2020,
            2121,
            2323,
        ])
        const arr2 = generatorToNumbers(alteration, 3, 80)
        expect(arr2).toEqual([
            9898,
            10101,
            12121,
        ])
    })
    test('it can reset', () => {
        const arr1 = generatorToNumbers(alteration, 100)
        const arr2 = generatorToNumbers(alteration, 100)
        expect(arr1).toEqual(arr2)
    })
    test('it has a help text', () => {
        let series = alteration.getGeneratorFunction()
        const first = series.next().value
        expect(first.getHelpText()).toBeDefined()
    })
})
