import NumberPeriodsCalculator from './calculator/number_periods'
import StellarLightCalculator from './calculator/stellar_light'
import CalculatorDeduplicator from './calculator/deduplicator'
import CalculatorMinMax from './calculator/min_max'
import CalculatorMixer from './calculator/mixer'

import * as digits from './numbers/digits.js'
// import fibonacci from './numbers/fibonacci.js'
import * as roundNumbers from './numbers/round_numbers.js'
import hexspeak from './numbers/hexspeak.js'
import * as decimalPatterns from './numbers/decimal_patterns'
import * as basicMath from './numbers/math_basic'
import relevantNumbers from './numbers/relevant_numbers'
import * as clockPeriods from './periods/clock.js'
import * as calendarPeriods from './periods/calendar.js'
import * as celestialCalendarPeriods from './periods/celestial_calendar.js'

import stars from './data/visible_stars'

class MyCalculator {
    constructor(birthday, now, options) {
        this.birthday = birthday
        this.now = now
        this.options = options || {}
        this.minDate = new Date(this.now)
        this.minDate.setDate(this.minDate.getDate()-7)
        this.loading = false

        // @TODO: to get faster, every NumberPeriodCalculator should drop results below minDate

        const numberPeriodCalc = new NumberPeriodsCalculator(this.birthday, this.minDate)
        numberPeriodCalc.addNumberGenerators(Object.values(digits))
        //calculator.addNumberGenerator(fibonacci)
        numberPeriodCalc.addNumberGenerators(Object.values(roundNumbers))
        numberPeriodCalc.addNumberGenerator(hexspeak)
        numberPeriodCalc.addNumberGenerators(Object.values(decimalPatterns))
        numberPeriodCalc.addNumberGenerators(Object.values(basicMath))
        numberPeriodCalc.addNumberGenerator(relevantNumbers)

        numberPeriodCalc.addPeriods(Object.values(clockPeriods))
        numberPeriodCalc.addPeriods(Object.values(calendarPeriods))
        numberPeriodCalc.addPeriods(Object.values(celestialCalendarPeriods))

        console.log(this.birthday, this.minDate)
        const stellarLightCalc = new CalculatorMinMax(
            new StellarLightCalculator(Array.from(stars), this.options.latitude || 50, this.birthday),
            this.minDate
        )

        this.calculator = new CalculatorDeduplicator(new CalculatorMixer(
            numberPeriodCalc,
            stellarLightCalc
        ))

        this.cache = []
    }

    getBirthday() {
        return this.birthday
    }
    isLoading() {
        return this.loading
    }

    get(amount, callback) {
        if (this.loading) { console.warning("another job to generate anniversaries is already running. Behavior is undefined and might lead to strange results.") }
        this.loading = true

        return new Promise((resolve, reject) => {
            while(this.cache.length < amount && !this.calculator.isDone()) {
                const anniversary = this.calculator.next()
                if (anniversary && anniversary.getTime() >= this.minDate.getTime()) { 
                    this.cache.push(anniversary)
                    callback && callback(this.cache.slice(0, amount))
                }
            }
            this.loading = false
            resolve(this.cache.slice(0, amount))
        })
    }
}

export default MyCalculator