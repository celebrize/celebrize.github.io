import {
    binary,
    octal,
    decimal,
    hexadecimal
} from './round_numbers.js'
import {generatorToNumbers} from './spec_helper.js'

describe('binary round number generator', () => {
    test('generates correct, ascending numbers', () => {
        const arr = generatorToNumbers(binary, 7)
        expect(arr).toEqual([
            0b1, 0b10, 0b100, 0b1000, 0b10000, 0b100000, 0b1000000
        ])
    })
    test('it can reset', () => {
        const arr1 = generatorToNumbers(binary, 100)
        const arr2 = generatorToNumbers(binary, 100)
        expect(arr1).toEqual(arr2)
    })
    test('it shows the correct label', () => {
        let series = binary.getGeneratorFunction()
        const first = series.next().value
        expect(first.toString()).toEqual("2⁰")
        const second = series.next().value
        expect(second.toString()).toEqual("2¹")
        const thrid = series.next().value
        expect(thrid.toString()).toEqual("2²")
        const fourth = series.next().value
        expect(fourth.toString()).toEqual("2³")
        series.next()
        series.next()
        series.next()
        series.next()
        series.next()
        series.next()
        const tenth = series.next().value
        expect(tenth.toString()).toEqual("2¹⁰")
    })
})
describe('octal round number generator', () => {
    test('generates correct, ascending numbers', () => {
        const arr = generatorToNumbers(octal, 21)
        expect(arr).toEqual([
            0o1, 0o2, 0o3, 0o4, 0o5, 0o6, 0o7,
            0o10, 0o20, 0o30, 0o40, 0o50, 0o60, 0o70,
            0o100, 0o200, 0o300, 0o400, 0o500, 0o600, 0o700,
        ])
    })
    test('it can reset', () => {
        const arr1 = generatorToNumbers(octal, 100)
        const arr2 = generatorToNumbers(octal, 100)
        expect(arr1).toEqual(arr2)
    })
    test('it shows the correct help text', () => {
        let series = octal.getGeneratorFunction()
        const first = series.next().value
        expect(first.toString()).toEqual("[1]₈")
        const second = series.next().value
        expect(second.toString()).toEqual("[2]₈")
        series.next()
        series.next()
        series.next()
        series.next()
        series.next()
        const eigth = series.next().value
        expect(eigth.toString()).toEqual("[10]₈")
        const nineth = series.next().value
        expect(nineth.toString()).toEqual("[20]₈")
    })
})
describe('decimal round number generator', () => {
    test('generates correct, ascending numbers', () => {
        const arr = generatorToNumbers(decimal, 27)
        expect(arr).toEqual([
            1, 2, 3, 4, 5, 6, 7, 8, 9,
            10, 20, 30, 40, 50, 60, 70, 80, 90,
            100, 200, 300, 400, 500, 600, 700, 800, 900,
        ])
    })
    test('it can reset', () => {
        const arr1 = generatorToNumbers(decimal, 100)
        const arr2 = generatorToNumbers(decimal, 100)
        expect(arr1).toEqual(arr2)
    })
})
describe('hexadecimal round number generator', () => {
    test('generates correct, ascending numbers', () => {
        const arr = generatorToNumbers(hexadecimal, 30)
        expect(arr).toEqual([
            0x1, 0x2, 0x3, 0x4, 0x5, 0x6, 0x7, 0x8, 0x9, 0xA, 0xB, 0xC, 0xD, 0xE, 0xF,
            0x10, 0x20, 0x30, 0x40, 0x50, 0x60, 0x70, 0x80, 0x90, 0xA0, 0xB0, 0xC0, 0xD0, 0xE0, 0xF0,
        ])
    })
    test('it can reset', () => {
        const arr1 = generatorToNumbers(hexadecimal, 100)
        const arr2 = generatorToNumbers(hexadecimal, 100)
        expect(arr1).toEqual(arr2)
    })
    test('it shows the correct help text', () => {
        let series = hexadecimal.getGeneratorFunction()
        const first = series.next().value
        expect(first.toString()).toEqual("0x1")
        const second = series.next().value
        expect(second.toString()).toEqual("0x2")
        series.next()
        series.next()
        series.next()
        series.next()
        series.next()
        series.next()
        series.next()
        const tenth = series.next().value
        expect(tenth.toString()).toEqual("0xA")
        series.next()
        series.next()
        series.next()
        series.next()
        series.next()
        const sixteenth = series.next().value
        expect(sixteenth.toString()).toEqual("0x10")
        const seventeenth = series.next().value
        expect(seventeenth.toString()).toEqual("0x20")
    })
})
