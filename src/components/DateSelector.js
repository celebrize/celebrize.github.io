import React, { useState } from 'react';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { Card, Grid, Button, Tooltip, IconButton } from '@material-ui/core';
import { KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers';
import HelpIcon from '@material-ui/icons/Help';
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

function DateSelector({defaultDate, minDate, maxDate, onDateChange}) {
    const classes = useStyles()

    const [date, setDate] = useState(moment(defaultDate))
    const [time, setTime] = useState(moment(defaultDate))

    const handleSubmit = (thisDate, thisTime) => {
        // allow handing dates directly, because `setDate` and `setTime` work asynchronously and `onAccept` does not always pick up the new date
        const bday = (thisDate || date).toDate()
        const timeObj = (thisTime || time).toDate()

        bday.setHours(timeObj.getHours())
        bday.setMinutes(timeObj.getMinutes())
        bday.setSeconds(timeObj.getSeconds())
        onDateChange(bday)
    }

    return (
      <Card className={classes.cta}>
        <Grid container spacing={1} justify="space-between" alignItems="flex-end">
          <Grid item><KeyboardDatePicker className={classes.ctaDate} label="Date" value={date || defaultDate} minDate={minDate} maxDate={maxDate} openTo="year" variant="dialog" onChange={setDate} onAccept={(date) => handleSubmit(date)} format={moment.localeData().longDateFormat('L')} /></Grid>
          <Grid item xs={8}><KeyboardTimePicker className={classes.ctaTime} label="Time" value={time} openTo="hours" variant="dialog" onChange={setTime} onAccept={(time) => handleSubmit(null, time)} format={moment.localeData().longDateFormat('LT')} ampm={false} /></Grid>
          <Grid item xs={4}><Button className={classes.ctaButton} variant="contained" color="primary" onClick={() => handleSubmit()}>Show</Button></Grid>
        </Grid>
      </Card>
    )
}

export default DateSelector;