import React, { useState } from 'react'
import Anniversaries from '../components/Anniversaries'
import PageHeader from '../components/PageHeader'
import PageFooter from '../components/PageFooter'
import DateSelector from '../components/DateSelector'
import { Button, Container, Icon } from '@material-ui/core'
import ShareIcon from '@material-ui/icons/Share'
import NotFound from './NotFound'
import moment from 'moment'
import { useParams, useHistory } from "react-router-dom";


const dateFormat = "YYYY-MM-DDTHH:mmZZ"


function Index() {
    const { date } = useParams()
    const history = useHistory()

    const birthday = moment(date, dateFormat, true)
    if (date && !birthday.isValid()) {
      return <NotFound message="Invalid date format." />
    }

    const handleDateChange = (date) => {
      console.log(date)
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
        <PageHeader maxWidth="lg" title="Celebrize – a reason to celebrate" subtitle="Enter your birthday or anniversary and see what you can celebrate in the next weeks.">
          <DateSelector minDate={minDate} maxDate={maxDate} defaultDate={birthday.isValid() ? birthday.toDate() : defaultDate} onDateChange={handleDateChange} />
          <Button variant="contained" color="default" endIcon={<ShareIcon />} >Share</Button>
        </PageHeader>
        <Container maxWidth="lg">
          { birthday.isValid() ? (
            <Anniversaries birthday={birthday} />
          ) : (
            "Todo"
          ) }
        </Container>
        <PageFooter maxWidth="lg" />
    </>)
}

export default Index