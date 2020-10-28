import React, { useState } from 'react';
import AnniversaryCalculator from '../anniversaryCalculator';

function Anniversary(props) {
    const key = props.date.getTime()
    console.log(props)
    return (<li key={key}>{props.date.toLocaleDateString()}: {props.number.number} {props.period.help}</li>)
}

function Anniversaries(props) {
    console.debug("anniversaries rendered")

    if(props.birthday) {
        const now = new Date()
        const min = new Date(now)
        min.setMonth(min.getMonth() - 2)
        const max = new Date(now)
        max.setMonth(max.getMonth() + 6)

        const calculator = new AnniversaryCalculator(min, max)
        const digits = require('../numbers/digits.js')
        const fibonacci = require('../numbers/fibonacci.js')
        const roundNumbers = require('../numbers/round_numbers.js')
        const hexspeak = require('../numbers/hexspeak.js')
        const decimalPatterns = require('../numbers/decimal_patterns')
        const basicMath = require('../numbers/math_basic')
        calculator.addNumberGenerators(Object.values(digits))
        calculator.addNumberGenerator(fibonacci)
        calculator.addNumberGenerators(Object.values(roundNumbers))
        calculator.addNumberGenerator(hexspeak)
        calculator.addNumberGenerators(Object.values(decimalPatterns))
        calculator.addNumberGenerators(Object.values(basicMath))

        const clockPeriods = require('../periods/clock.js')
        const calendarPeriods = require('../periods/calendar.js')
        const celestialCalendarPeriods = require('../periods/celestial_calendar.js')
        calculator.addPeriods(Object.values(clockPeriods))
        calculator.addPeriods(Object.values(calendarPeriods))
        calculator.addPeriods(Object.values(celestialCalendarPeriods))

        const [upcoming, justPassed] = calculator.calculate(props.birthday, now)

        return (<div>
            <h2>{props.birthday.toLocaleDateString()}</h2>
            <ul>
                {upcoming.map(anniversary => Anniversary(anniversary))}
            </ul>
        </div>)
    } else {
        return (<p>Select your Birthday.</p>)
    }
}

export default Anniversaries;
