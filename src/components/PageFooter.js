import React from 'react';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => {
    return {
      footer: {
        padding: theme.spacing(3, 2),
        marginTop: 'auto',
        backgroundColor:
          theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
      },
    }
  });

function PageHeader({maxWidth, children}) {
    const classes = useStyles()
    return (
      <footer className={classes.footer}>
        <Container maxWidth={maxWidth}>
          <Typography variant="body1">TODO</Typography>
        </Container>
      </footer>
    )
}

export default PageHeader;