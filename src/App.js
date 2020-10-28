import React, { useState } from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { DatePicker } from '@material-ui/pickers';
import Anniversaries from './components/Anniversaries.js';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

function App() {
  const minDate = new Date()
  minDate.setFullYear(minDate.getFullYear() - 120)
  const maxDate = new Date()
  maxDate.setDate(maxDate.getDate() - 1)
  const defaultDate = new Date()
  defaultDate.setFullYear(defaultDate.getFullYear() - 30)
  
  const [birthday, setBirthday] = useState(null)
  const onDateChange = (date) => {
    setBirthday(date.toDate())
  }

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Container maxWidth="sm">
        <DatePicker value={birthday || defaultDate} minDate={minDate} maxDate={maxDate} openTo="year" variant="inline" onChange={onDateChange} />
        <Button variant="contained" color="primary">
          Hello World
        </Button>
        <Anniversaries birthday={birthday} />

      </Container>
    </MuiPickersUtilsProvider>
  );
}

export default App;
