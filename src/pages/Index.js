import React, { useState } from 'react'
import Anniversaries from '../components/Anniversaries'
import AnniversaryInfo from '../components/AnniversaryInfo'
import PageHeader from '../components/PageHeader'
import PageFooter from '../components/PageFooter'
import DateSelector from '../components/DateSelector'
import { Container, CircularProgress, Typography, Button } from '@material-ui/core'
import NotFound from './NotFound'
import moment from 'moment'
import { useParams, useHistory } from "react-router-dom";
import Share from '../components/Share'
import { appName, appTagLine } from '../static'
import Testimonials from '../components/Testimonials'
import MyCalculator from '../MyCalculator'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => {
    return {
        spinner: {
          margin: "0 auto",
          color: "#fff",
        },
        moreButton: {
          color: "rgba(255,255,255,0.87)",
          borderColor: "rgba(255,255,255,0.23)",
          "&:hover, &:focus": {
            backgroundColor: "rgba(255,255,255,0.04)",
          }
        }
    }
});


const dateFormat = "YYYY-MM-DDTHH:mmZZ"
const defaultMaxAnniversaries = 11

function Index() {
    const classes = useStyles()
    const { date } = useParams()
    const history = useHistory()
    const [calculator, setCalculator] = useState(undefined)
    const [anniversaries, setAnniversaries] = useState([])
    const [maxAnniversaries, setMaxAnniversaries] = useState(defaultMaxAnniversaries)

    const birthday = moment(date, dateFormat, true)
    if (date && !birthday.isValid()) {
      return <NotFound message="Invalid date format." />
    }

    if (birthday && birthday.isValid()) {
        if (!calculator || calculator.getBirthday().getTime() !== birthday.toDate().getTime()) {
            // new date -> new calculator
            const theCalculator = new MyCalculator(birthday.toDate(), new Date())
            setCalculator(theCalculator)
            setAnniversaries([])
            setMaxAnniversaries(defaultMaxAnniversaries)
            return "" // @TODO: load animation
        }
    } else if(calculator !== undefined) {
        setCalculator(undefined)
        setAnniversaries([])
        setMaxAnniversaries(defaultMaxAnniversaries)
    }

    if (calculator && anniversaries.length < maxAnniversaries && !calculator.isLoading()) {
        calculator.get(maxAnniversaries, anniversaries => {
          setAnniversaries(anniversaries)
        }).then(anniversaries => {
          setAnniversaries(anniversaries)
        })
    }

    const handleDateChange = (date) => {
      history.push("/" + moment(date).format(dateFormat))
    }

    const minDate = new Date()
    minDate.setFullYear(minDate.getFullYear() - 120)
    const maxDate = new Date()
    maxDate.setDate(maxDate.getDate() - 1)
    const defaultDate = new Date()
    defaultDate.setFullYear(defaultDate.getFullYear() - 30)
    defaultDate.setHours(12)
    defaultDate.setMinutes(0)
    defaultDate.setSeconds(0)

    return (<>
        <PageHeader maxWidth="lg" title={`${appName} – ${appTagLine}`} subtitle="Enter your birthday or anniversary and see what you can celebrate in the next weeks.">
          <DateSelector minDate={minDate} maxDate={maxDate} defaultDate={birthday.isValid() ? birthday.toDate() : defaultDate} onDateChange={handleDateChange} />
        </PageHeader>
        <Container maxWidth="lg">
          { anniversaries.length > 0 ? (
            <Anniversaries anniversaries={anniversaries} maxAnniversaries={maxAnniversaries}>
              { anniversaries.length === maxAnniversaries ? (
                <AnniversaryInfo>
                  <Typography paragraph={true}>
                    Didn't find anything suitable? Try some other dates that are important to you, like
                    the day you started your current occupation or an important event in your life.
                  </Typography>
                  <Button className={classes.moreButton} variant="outlined" onClick={() => setMaxAnniversaries(maxAnniversaries+6)}>or Load more</Button>
                </AnniversaryInfo>
              ) : (
                <AnniversaryInfo>
                  <CircularProgress className={classes.spinner} />
                </AnniversaryInfo>
              )}
            </Anniversaries>
          ) : (
            <Testimonials />
          ) }
        </Container>
        <PageFooter maxWidth="lg" />
        <Share />
    </>)
}

export default Index
