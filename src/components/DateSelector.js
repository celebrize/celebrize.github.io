import React, { useState } from 'react';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { Card, Grid, Button } from '@material-ui/core';
import { KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers';
import moment from 'moment';

const useStyles = makeStyles((theme) => {
    return {
        cta: {
            width: theme.breakpoints.values.xs - theme.spacing(4),
            // same as result box
            padding: theme.spacing(2, 2, 2, 2),
            margin: "0 auto",
        },
        ctaDate: {
            marginTop: theme.spacing(1),
        },
        ctaTime: {
            marginTop: theme.spacing(1),
        },
        ctaButton: {
            margin: theme.spacing(1, 1, 0, 0),
        },
    }
  });

function DateSelector({onDateChange}) {
    const classes = useStyles()

    const minSelectableDate = new Date()
    minSelectableDate.setFullYear(minSelectableDate.getFullYear() - 120)
    const maxSelectableDate = new Date()
    maxSelectableDate.setDate(maxSelectableDate.getDate() - 1)
    const defaultDate = new Date()
    defaultDate.setFullYear(defaultDate.getFullYear() - 30)
    defaultDate.setHours(12)
    defaultDate.setMinutes(0)
    defaultDate.setSeconds(0)
    
    const [date, setDate] = useState(moment(defaultDate))
    const [time, setTime] = useState(moment(defaultDate))

    const handleSubmit = () => {
        const bday = new Date(date.toDate())
        const timeObj = time.toDate()

        bday.setHours(timeObj.getHours())
        bday.setMinutes(timeObj.getMinutes())
        bday.setSeconds(timeObj.getSeconds())
        onDateChange(bday)
    }

    return (
      <Card className={classes.cta}>
        <Grid container spacing={1} justify="space-between" alignItems="flex-end">
          <Grid item><KeyboardDatePicker className={classes.ctaDate} label="Date" value={date || defaultDate} minDate={minSelectableDate} maxDate={maxSelectableDate} openTo="year" variant="inline" onChange={setDate} format={moment.localeData().longDateFormat('L')} /></Grid>
          <Grid item xs={6}><KeyboardTimePicker className={classes.ctaTime} label="Time" value={time} openTo="hours" variant="inline" onChange={setTime} format={moment.localeData().longDateFormat('LT')} ampm={false} /></Grid>
          <Grid item xs={2}>?</Grid>
          <Grid item xs={4}><Button className={classes.ctaButton} variant="contained" color="primary" onClick={handleSubmit}>Show</Button></Grid>
        </Grid>
      </Card>
    )
}

export default DateSelector;