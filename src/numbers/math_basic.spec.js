const {
    squares,
} = require('./math_basic.js')
const {iteratorToNumbers} = require('./spec_helper.js')

describe('square number generator', () => {
    test('generates correct, ascending numbers', () => {
        const arr = iteratorToNumbers(squares(), 11)
        expect(arr).toEqual([
            4,
            9,
            16,
            25,
            36,
            49,
            64,
            81,
            100,
            400,
            900,
        ])
    })
    test('it can reset', () => {
        const arr1 = iteratorToNumbers(squares(), 100)
        const arr2 = iteratorToNumbers(squares(), 100)
        expect(arr1).toEqual(arr2)
    })
    test('it shows the correct help text', () => {
        let series = squares()
        const first = series.next().value
        expect(first.help).toEqual("square of the number 2")
        const second = series.next().value
        expect(second.help).toEqual("square of the number 3")
    })
})
