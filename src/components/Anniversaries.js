import React, { useState } from 'react';
import Anniversary from './Anniversary';
import AnniversaryInfo from './AnniversaryInfo'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';




const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function Anniversaries({anniversaries}) {
    const classes = useStyles()
    
    const spacing = 2

    const lowestOddity = anniversaries.reduce((min, current) => Math.min(min, current.getOddity()), 999)

    return (
      <Grid container className={classes.root} spacing={spacing} justify="center">
        {anniversaries.map(anniversary => (<Anniversary anniversary={anniversary} key={anniversary.getStaticId()} highlightIf={lowestOddity * 1.1} />))}
        <AnniversaryInfo />
      </Grid>
    )
}

export default Anniversaries;
