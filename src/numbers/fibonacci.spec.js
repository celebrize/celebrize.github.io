import fibonacci from './fibonacci.js'
import {generatorToNumbers} from './spec_helper.js'

describe('fibonacci number generator', () => {
    test('generates correct, ascending numbers', () => {
        const arr = generatorToNumbers(fibonacci, 18)
        expect(arr).toEqual([
            1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181
        ])
    })
    test('it can reset', () => {
        const arr1 = generatorToNumbers(fibonacci, 100)
        const arr2 = generatorToNumbers(fibonacci, 100)
        expect(arr1).toEqual(arr2)
    })
    test('it shows the correct help text', () => {
        let series = fibonacci.getGeneratorFunction()
        const first = series.next().value
        // @TODO: we don't value good grammar for now :D
        expect(first.getHelpText()).toEqual("1 is the 2th Fibonacci number")
        const second = series.next().value
        expect(second.getHelpText()).toEqual("2 is the 3th Fibonacci number")
        const thrid = series.next().value
        expect(thrid.getHelpText()).toEqual("3 is the 4th Fibonacci number")
        const fourth = series.next().value
        expect(fourth.getHelpText()).toEqual("5 is the 5th Fibonacci number")
    })
})
