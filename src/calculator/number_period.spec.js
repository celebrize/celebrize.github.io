import NumberPeriodCalculator from './number_period'
import GeneratedNumber from '../domain/generated_number'
import Period from '../domain/period'
import GeneratedPeriod from '../domain/generated_period'
import NumberGenerator from '../domain/number_generator'

const naturalNumberGenerator = new NumberGenerator(function* () {
    let number = 1
    while (true) {
        yield new GeneratedNumber(number)
        number++
    }
})

const years = new Period((now, number) => {
    const date = new Date(now)
    date.setFullYear(date.getFullYear() + Number(number))

    return new GeneratedPeriod(date)
})

test("it generates anniversaries forever", () => {
    const birthday = new Date()
    const calculator = new NumberPeriodCalculator(naturalNumberGenerator, years, birthday)
    for (let i=1; i<100; i++) {
        const anniversary = calculator.next()
        expect(anniversary).toBeTruthy()
        expect(calculator.isDone()).toBeFalsy()
    }
})

test("it aborts if numbers run out", () => {
    const limitedNumberGenerator = new NumberGenerator(function* () {        
        yield new GeneratedNumber(1)
        yield new GeneratedNumber(2)
        yield new GeneratedNumber(3)
    })

    const birthday = new Date()
    const calculator = new NumberPeriodCalculator(limitedNumberGenerator, years, birthday)

    expect(calculator.next()).toBeTruthy()
    expect(calculator.isDone()).toBeFalsy()
    expect(calculator.next()).toBeTruthy()
    expect(calculator.isDone()).toBeFalsy()
    expect(calculator.next()).toBeTruthy()
    expect(calculator.isDone()).toBeFalsy()
    expect(calculator.next()).toBeFalsy()
    expect(calculator.isDone()).toBeTruthy()
})

test("it aborts if period is nan", () => {
    const limitedYears = new Period((now, number) => {
        let date = new Date(now)
        date.setFullYear(date.getFullYear() + Number(number))

        if (number > 3) {
            date = new Date(undefined)
        }

        return new GeneratedPeriod(date)
    })

    const birthday = new Date()
    const calculator = new NumberPeriodCalculator(naturalNumberGenerator, limitedYears, birthday)

    expect(calculator.next()).toBeTruthy()
    expect(calculator.isDone()).toBeFalsy()
    expect(calculator.next()).toBeTruthy()
    expect(calculator.isDone()).toBeFalsy()
    expect(calculator.next()).toBeTruthy()
    expect(calculator.isDone()).toBeFalsy()
    expect(calculator.next()).toBeFalsy()
    expect(calculator.isDone()).toBeTruthy()
})

test("it aborts if no period is returned", () => {
    const limitedYears = new Period((now, number) => {
        let date = new Date(now)
        date.setFullYear(date.getFullYear() + Number(number))

        if (number > 3) {
            return
        }

        return new GeneratedPeriod(date)
    })

    const birthday = new Date()
    const calculator = new NumberPeriodCalculator(naturalNumberGenerator, limitedYears, birthday)

    expect(calculator.next()).toBeTruthy()
    expect(calculator.isDone()).toBeFalsy()
    expect(calculator.next()).toBeTruthy()
    expect(calculator.isDone()).toBeFalsy()
    expect(calculator.next()).toBeTruthy()
    expect(calculator.isDone()).toBeFalsy()
    expect(calculator.next()).toBeFalsy()
    expect(calculator.isDone()).toBeTruthy()
})