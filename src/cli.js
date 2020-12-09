import AnniversaryCalculator from './anniversaryCalculator.js'

import * as digits from '../numbers/digits.js'
//import fibonacci from '../numbers/fibonacci.js'
import * as roundNumbers from '../numbers/round_numbers.js'
import hexspeak from '../numbers/hexspeak.js'
import * as decimalPatterns from '../numbers/decimal_patterns'
import * as basicMath from '../numbers/math_basic'
import relevantNumbers from '../numbers/relevant_numbers'
import * as clockPeriods from '../periods/clock.js'
import * as calendarPeriods from '../periods/calendar.js'
import * as celestialCalendarPeriods from '../periods/celestial_calendar.js'

const birthday = new Date(process.argv[2])
const now = new Date()

const min = new Date(now)
min.setMonth(min.getMonth() - 2)
const max = new Date(now)
max.setMonth(max.getMonth() + 6)
const calculator = new AnniversaryCalculator(min, max)
calculator.addNumberGenerators(Object.values(digits))
//calculator.addNumberGenerator(fibonacci)
calculator.addNumberGenerators(Object.values(roundNumbers))
calculator.addNumberGenerator(hexspeak)
calculator.addNumberGenerators(Object.values(decimalPatterns))
calculator.addNumberGenerators(Object.values(basicMath))
calculator.addNumberGenerators(relevantNumbers)

calculator.addPeriods(Object.values(clockPeriods))
calculator.addPeriods(Object.values(calendarPeriods))
calculator.addPeriods(Object.values(celestialCalendarPeriods))

const anniversaries = calculator.calculate(birthday)
console.log(anniversaries)
