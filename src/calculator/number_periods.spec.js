import {years, months} from '../periods/calendar'
import NumberGenerator from '../domain/number_generator.js'
import GeneratedNumber from '../domain/generated_number.js'
import NumberPeriodsCalculator from './number_periods'

// plain number generator that generates natural numbers
const naturalNumberGenerator = new NumberGenerator(function* () {
    let number = 1
    while (true) {
        yield new GeneratedNumber(number)
        number++
    }
})

test('it sorts dates ascending', () => {
    const birthday = new Date('1969-07-20 20:17:58Z')

    const calculator = new NumberPeriodsCalculator(birthday)
    calculator.addNumberGenerator(naturalNumberGenerator)
    calculator.addPeriod(years)
    calculator.addPeriod(months)

    let lastDate = null
    for(let i=0; i < 100; i++) {
        const anniversary = calculator.next()
        if (lastDate !== null)  {
            expect(anniversary.getDateObject().getTime()).toBeGreaterThanOrEqual(lastDate.getTime())
        }
        lastDate = anniversary.getDateObject()
    }
})