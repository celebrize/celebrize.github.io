import React, { useState } from 'react';
import Anniversary from './Anniversary';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, CircularProgress, Card } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  tile: {
      position: "relative",
      color: "#fff",
      alignItems: "center",
      height: "100%",
  },
}));

function Anniversaries({anniversaries, children}) {
    const classes = useStyles()
    
    const spacing = 2

    const lowestOddity = anniversaries.reduce((min, current) => Math.min(min, current.getOddity()), 999)

    return (
      <Grid container className={classes.root} spacing={spacing} justify="center">
        {anniversaries.map(anniversary => (<Anniversary anniversary={anniversary} key={anniversary.getStaticId()} highlightIf={lowestOddity * 1.1} />))}
        {children}
      </Grid>
    )
}

export default Anniversaries;
