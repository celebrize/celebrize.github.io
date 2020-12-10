import CalculatorMixer from './mixer'
import Anniversary from '../domain/anniversary/anniversary'

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

test('it sorts dates ascending', () => {
    // 31 days distributed randomly on the mocks
    const data1 = []
    const data2 = []
    const data3 = []
    for (let day=1; day<=31; day++) {
        const rand = Math.floor(Math.random() * 3)
        const date = new Date("2020-01-01T00:00:00Z")
        date.setUTCDate(day)
        const anniversary = new Anniversary(date)
        if (rand === 0) {
            data1.push(anniversary)
        } else if (rand === 1) {
            data2.push(anniversary)
        } else {
            data3.push(anniversary)
        }
    }
    const mock1 = new MockCalculator(...data1)
    const mock2 = new MockCalculator(...data2)
    const mock3 = new MockCalculator(...data3)
    
    const calculator = new CalculatorMixer(mock1, mock2, mock3)

    for (let day=1; day<32; day++) {
        const anniversary = calculator.next()
        expect(anniversary).toBeTruthy()
        expect(anniversary.getDateObject().getUTCDate()).toEqual(day)
    }
    const anniversary = calculator.next()
    expect(anniversary).toBeFalsy()
    expect(calculator.isDone()).toBeTruthy()
    
})