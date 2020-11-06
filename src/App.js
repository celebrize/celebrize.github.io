import React, { useState } from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { DateTimePicker,  } from '@material-ui/pickers';
import Anniversaries from './components/Anniversaries.js';

import Container from '@material-ui/core/Container';

function App() {
  const minSelectableDate = new Date()
  minSelectableDate.setFullYear(minSelectableDate.getFullYear() - 120)
  const maxSelectableDate = new Date()
  maxSelectableDate.setDate(maxSelectableDate.getDate() - 1)
  const defaultSelectableDate = new Date()
  defaultSelectableDate.setFullYear(defaultSelectableDate.getFullYear() - 30)
  defaultSelectableDate.setHours(12)
  defaultSelectableDate.setMinutes(0)
  defaultSelectableDate.setSeconds(0)
  
  const [birthday, setBirthday] = useState(null)
  const onDateChange = (date) => {
    setBirthday(date.toDate())
  }

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Container maxWidth="sm">
        <DateTimePicker value={birthday || defaultSelectableDate} minDate={minSelectableDate} maxDate={maxSelectableDate} openTo="year" variant="inline" onChange={onDateChange} format="MMMM Do YYYY" />
        <Anniversaries birthday={birthday} />
      </Container>
    </MuiPickersUtilsProvider>
  );
}

export default App;
