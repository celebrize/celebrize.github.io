import Anniversary from '../domain/anniversary/anniversary'
import CalculatorMinMax from './min_max'

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

it("does not show results earlier than minDate", () => {
    const data = [
        new Anniversary(new Date('2020-01-01 00:00:00')),
        new Anniversary(new Date('2020-01-01 12:00:00')),
        new Anniversary(new Date('2020-01-01 18:30:00')),
        new Anniversary(new Date('2020-01-02 00:00:00')),
        new Anniversary(new Date('2020-01-02 01:00:00')),
    ]
    const mockCalc = new MockCalculator(...data)
    const calc = new CalculatorMinMax(mockCalc, new Date('2020-01-02 00:00:00'))

    const anni1 = calc.next()
    expect(formatDateTime(anni1.getDateObject())).toEqual("2020-01-02 00:00:00")
    expect(calc.isDone()).toBeFalsy()
    const anni2 = calc.next()
    expect(formatDateTime(anni2.getDateObject())).toEqual("2020-01-02 01:00:00")
})

it("does not show results later than maxDate", () => {
    const data = [
        new Anniversary(new Date('2020-01-01 12:00:00')),
        new Anniversary(new Date('2020-01-02 00:00:00')),
        new Anniversary(new Date('2020-01-02 00:01:00')),
        new Anniversary(new Date('2020-01-03 00:00:00')),
    ]
    const mockCalc = new MockCalculator(...data)
    const calc = new CalculatorMinMax(mockCalc, null, new Date('2020-01-02 00:00:00'))

    const anni1 = calc.next()
    expect(formatDateTime(anni1.getDateObject())).toEqual("2020-01-01 12:00:00")
    expect(anni1.getOddity()).toEqual(1)
    expect(calc.isDone()).toBeFalsy()
    const anni2 = calc.next()
    expect(formatDateTime(anni2.getDateObject())).toEqual("2020-01-02 00:00:00")
    expect(anni2.getOddity()).toEqual(1)
    expect(calc.isDone()).toBeFalsy()
    const anni3 = calc.next()
    expect(anni3).toBeFalsy()
    expect(calc.isDone()).toBeTruthy()
})
