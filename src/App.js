import React, { useState } from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { DatePicker } from '@material-ui/pickers';
import Anniversaries from './components/Anniversaries.js';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

function App() {
  const minSelectableDate = new Date()
  minSelectableDate.setFullYear(minSelectableDate.getFullYear() - 120)
  const maxSelectableDate = new Date()
  maxSelectableDate.setDate(maxSelectableDate.getDate() - 1)
  const defaultSelectableDate = new Date()
  defaultSelectableDate.setFullYear(defaultSelectableDate.getFullYear() - 30)
  
  const [birthday, setBirthday] = useState(null)
  const onDateChange = (date) => {
    date.hours(12).minutes(0).seconds(0)
    setBirthday(date.toDate())
  }

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Container maxWidth="sm">
        <DatePicker value={birthday || defaultSelectableDate} minDate={minSelectableDate} maxDate={maxSelectableDate} openTo="year" variant="inline" onChange={onDateChange} />
        <Anniversaries birthday={birthday} />
      </Container>
    </MuiPickersUtilsProvider>
  );
}

export default App;
