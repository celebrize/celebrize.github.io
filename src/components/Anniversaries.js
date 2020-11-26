import React, { useState } from 'react';
import AnniversaryCalculator from '../anniversaryCalculator';
import Anniversary from './Anniversary';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function Anniversaries(props) {
    const classes = useStyles()
    
    const spacing = 2

    const now = new Date()
    const min = new Date(now)
    min.setDate(min.getDate() - 8)
    const max = new Date(now)
    max.setMonth(max.getMonth() + 6)

    const calculator = new AnniversaryCalculator(min, max)
    const digits = require('../numbers/digits.js')
    const fibonacci = require('../numbers/fibonacci.js')
    const roundNumbers = require('../numbers/round_numbers.js')
    const hexspeak = require('../numbers/hexspeak.js')
    const decimalPatterns = require('../numbers/decimal_patterns')
    const basicMath = require('../numbers/math_basic')
    const relevantNumbers = require('../numbers/relevant_numbers')
    calculator.addNumberGenerators(Object.values(digits))
    calculator.addNumberGenerator(fibonacci)
    calculator.addNumberGenerators(Object.values(roundNumbers))
    calculator.addNumberGenerator(hexspeak)
    calculator.addNumberGenerators(Object.values(decimalPatterns))
    calculator.addNumberGenerators(Object.values(basicMath))
    calculator.addNumberGenerator(relevantNumbers)

    const clockPeriods = require('../periods/clock.js')
    const calendarPeriods = require('../periods/calendar.js')
    const celestialCalendarPeriods = require('../periods/celestial_calendar.js')
    calculator.addPeriods(Object.values(clockPeriods))
    calculator.addPeriods(Object.values(calendarPeriods))
    calculator.addPeriods(Object.values(celestialCalendarPeriods))

    const [upcoming, justPassed] = calculator.calculate(props.birthday.toDate(), now)
    const lowestOddity = upcoming.reduce((min, current) => Math.min(min, current.getOddity()), 999)

    return (
      <Grid container className={classes.root} spacing={spacing} justify="center">
        {justPassed.map(anniversary => (<Anniversary anniversary={anniversary} key={anniversary.getStaticId()} />))}
        {upcoming.map(anniversary => (<Anniversary anniversary={anniversary} key={anniversary.getStaticId()} highlightIf={lowestOddity * 1.1} />))}
      </Grid>
    )
}

export default Anniversaries;
