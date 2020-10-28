const {
    alteration,
    repetition,
    streetAscending,
    streetDescending,
} = require('./decimal_patterns.js')
const {iteratorToNumbers} = require('./spec_helper.js')

describe('street ascending generator', () => {
    test('generates correct, ascending numbers', () => {
        const arr = iteratorToNumbers(streetAscending(), 12)
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
        const arr1 = iteratorToNumbers(streetAscending(), 100)
        const arr2 = iteratorToNumbers(streetAscending(), 100)
        expect(arr1).toEqual(arr2)
    })
    test('it shows the correct help text', () => {
        let series = streetAscending()
        const first = series.next().value
        expect(first.help).toEqual("it is a string of ascending digits")
    })
})

describe('street descending generator', () => {
    test('generates correct, ascending numbers', () => {
        const arr = iteratorToNumbers(streetDescending(), 12)
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
        const arr1 = iteratorToNumbers(streetDescending(), 100)
        const arr2 = iteratorToNumbers(streetDescending(), 100)
        expect(arr1).toEqual(arr2)
    })
    test('it shows the correct help text', () => {
        let series = streetDescending()
        const first = series.next().value
        expect(first.help).toEqual("it is a string of descending digits")
    })
})

describe('repetition generator', () => {
    test('generates correct, ascending numbers', () => {
        const arr = iteratorToNumbers(repetition(), 12)
        expect(arr).toEqual([
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
        const arr1 = iteratorToNumbers(repetition(), 100)
        const arr2 = iteratorToNumbers(repetition(), 100)
        expect(arr1).toEqual(arr2)
    })
    test('it shows the correct help text', () => {
        let series = repetition()
        const first = series.next().value
        expect(first.help).toEqual("it is a string of repeating digits")
    })
})

describe('alteration generator', () => {
    test('generates correct, ascending numbers', () => {
        const arr1 = iteratorToNumbers(alteration(), 12)
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
        const arr2 = iteratorToNumbers(alteration(), 3, 80)
        expect(arr2).toEqual([
            9898,
            10101,
            12121,
        ])
    })
    test('it can reset', () => {
        const arr1 = iteratorToNumbers(alteration(), 100)
        const arr2 = iteratorToNumbers(alteration(), 100)
        expect(arr1).toEqual(arr2)
    })
    test('it shows the correct help text', () => {
        let series = alteration()
        const first = series.next().value
        expect(first.help).toEqual("it is a string of alternating digits")
    })
})
