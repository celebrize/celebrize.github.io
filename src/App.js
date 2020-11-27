import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import momentDe from 'moment/locale/de'; // import needed to have the german translation available (aka: this import has side-effects)
import momentEnGb from 'moment/locale/en-gb'; // import needed to have the english translation available (aka: this import has side-effects)
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

import Index from './pages/Index'
import About from './pages/dialog/About'

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

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <ThemeProvider theme={myTheme}>
      <div className={classes.root}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Index />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/:date">
              <Index />
            </Route>
            <Route path="*">
              No match
            </Route>
          </Switch>
        </Router>
      </div>
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  );
}

export default App;
