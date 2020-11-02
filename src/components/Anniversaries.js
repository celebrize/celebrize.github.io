import React, { useState } from 'react';
import AnniversaryCalculator from '../anniversaryCalculator';
import Anniversary from './Anniversary';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
}));
function Anniversaries(props) {
    console.debug("anniversaries rendered")
    const classes = useStyles()

    if(props.birthday) {
        const now = new Date()
        const min = new Date(now)
        min.setMonth(min.getMonth() - 1)
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

        return (
            <div  className={classes.root}>
              <GridList cellHeight={180} cols={2} spacing={4}>
              <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                  <ListSubheader component="div">Just passed</ListSubheader>
                </GridListTile>
                {justPassed.map(anniversary => (<Anniversary anniversary={anniversary} />))}
                <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                  <ListSubheader component="div">Upcoming Birthdays</ListSubheader>
                </GridListTile>
                {upcoming.map(anniversary => (<Anniversary anniversary={anniversary} />))}
              </GridList>
            </div>
          )
    } else {
        return (<p>Select your Birthday.</p>)
    }
}

export default Anniversaries;
