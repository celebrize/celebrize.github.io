import React, { useState } from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import Anniversaries from './components/Anniversaries.js';
import PageHeader from './components/PageHeader'
import PageFooter from './components/PageFooter'
import DateSelector from './components/DateSelector'
import moment from 'moment';
import momentDe from 'moment/locale/de'; // import needed to have the german translation available (aka: this import has side-effects)
import momentEnGb from 'moment/locale/en-gb'; // import needed to have the english translation available (aka: this import has side-effects)
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

import Container from '@material-ui/core/Container';

const myTheme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 280,
      sm: 560,
      md: 840,
      lg: 1120,
    },
  },
});

const useStyles = makeStyles((_) => {
  // WARNING: YOU GET THE DEFAULT THEME HERE
  return {
      root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      },
  }
});

function App() {
  // @TODO: detect locale
  moment.locale("en-gb")

  const classes = useStyles()
  const [birthday, setBirthday] = useState(null)

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <ThemeProvider theme={myTheme}>
      <div className={classes.root}>
        <PageHeader maxWidth="lg" title="Celebrize – a reason to celebrate" subtitle="Find a Lorem ipsum sid dolor ahmet de consecuteur">
          <DateSelector onDateChange={setBirthday} />
        </PageHeader>
        <Container maxWidth="lg">
          <Anniversaries birthday={birthday} />
        </Container>
        <PageFooter maxWidth="lg" />
      </div>
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  );
}

export default App;
