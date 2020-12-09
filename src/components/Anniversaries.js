import React, { useState } from 'react';
import AnniversaryCalculator from '../anniversaryCalculator';
import Anniversary from './Anniversary';
import AnniversaryInfo from './AnniversaryInfo'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


import * as digits from '../numbers/digits.js'
// import fibonacci from '../numbers/fibonacci.js'
import * as roundNumbers from '../numbers/round_numbers.js'
import hexspeak from '../numbers/hexspeak.js'
import * as decimalPatterns from '../numbers/decimal_patterns'
import * as basicMath from '../numbers/math_basic'
import relevantNumbers from '../numbers/relevant_numbers'
import * as clockPeriods from '../periods/clock.js'
import * as calendarPeriods from '../periods/calendar.js'
import * as celestialCalendarPeriods from '../periods/celestial_calendar.js'

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
    calculator.addNumberGenerators(Object.values(digits))
    //calculator.addNumberGenerator(fibonacci)
    calculator.addNumberGenerators(Object.values(roundNumbers))
    calculator.addNumberGenerator(hexspeak)
    calculator.addNumberGenerators(Object.values(decimalPatterns))
    calculator.addNumberGenerators(Object.values(basicMath))
    calculator.addNumberGenerator(relevantNumbers)

    calculator.addPeriods(Object.values(clockPeriods))
    calculator.addPeriods(Object.values(calendarPeriods))
    calculator.addPeriods(Object.values(celestialCalendarPeriods))

    const anniversaries = calculator.calculate(props.birthday.toDate(), now)
    const lowestOddity = anniversaries.reduce((min, current) => Math.min(min, current.getOddity()), 999)

    return (
      <Grid container className={classes.root} spacing={spacing} justify="center">
        {anniversaries.map(anniversary => (<Anniversary anniversary={anniversary} key={anniversary.getStaticId()} highlightIf={lowestOddity * 1.1} />))}
        <AnniversaryInfo />
      </Grid>
    )
}

export default Anniversaries;
