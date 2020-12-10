import Anniversary from '../domain/anniversary/anniversary'
import CalculatorDeduplicator from './deduplicator'

class MockCalculator {
    constructor(...data) {
        this.data = data
    }

    isDone() {
        return this.data.length === 0
    }

    next() {
        return this.data.shift()
    }
}

const formatDate = date => `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
const formatTime = date => `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`
const formatDateTime = date => `${formatDate(date)} ${formatTime(date)}`


it("deduplicates", () => {
    const data = [
        new Anniversary(new Date('2020-01-01 00:00:00')),
        new Anniversary(new Date('2020-01-01 12:00:00')),
        new Anniversary(new Date('2020-01-01 18:30:00')),
        new Anniversary(new Date('2020-01-02 00:00:00')),
        new Anniversary(new Date('2020-01-02 00:00:00')),
        new Anniversary(new Date('2020-01-02 00:01:00')),
        new Anniversary(new Date('2020-01-03 00:00:00')),
    ]
    const mockCalc = new MockCalculator(...data)
    const calc = new CalculatorDeduplicator(mockCalc)

    const anni1 = calc.next()
    expect(formatDate(anni1.getDateObject())).toEqual("2020-01-01")
    expect(calc.isDone()).toBeFalsy()
    const anni2 = calc.next()
    expect(formatDate(anni2.getDateObject())).toEqual("2020-01-02")
    expect(calc.isDone()).toBeFalsy()
    const anni3 = calc.next()
    expect(formatDate(anni3.getDateObject())).toEqual("2020-01-03")
    expect(calc.isDone()).toBeTruthy()
})

it("takes the least odd anniversary", () => {
    const data = [
        new Anniversary(new Date('2020-01-01 00:00:00'), 1),
        new Anniversary(new Date('2020-01-01 12:00:00'), 2),
        new Anniversary(new Date('2020-01-01 18:30:00'), 3),
        new Anniversary(new Date('2020-01-02 00:00:00'), 2),
        new Anniversary(new Date('2020-01-02 00:00:00'), 2),
        new Anniversary(new Date('2020-01-02 00:01:00'), 1),
        new Anniversary(new Date('2020-01-03 00:00:00'), 3),
    ]
    const mockCalc = new MockCalculator(...data)
    const calc = new CalculatorDeduplicator(mockCalc)

    const anni1 = calc.next()
    expect(formatDateTime(anni1.getDateObject())).toEqual("2020-01-01 00:00:00")
    expect(anni1.getOddity()).toEqual(1)
    expect(calc.isDone()).toBeFalsy()
    const anni2 = calc.next()
    expect(formatDateTime(anni2.getDateObject())).toEqual("2020-01-02 00:01:00")
    expect(anni2.getOddity()).toEqual(1)
    expect(calc.isDone()).toBeFalsy()
    const anni3 = calc.next()
    expect(formatDateTime(anni3.getDateObject())).toEqual("2020-01-03 00:00:00")
    expect(anni3.getOddity()).toEqual(3)
    expect(calc.isDone()).toBeTruthy()
})
