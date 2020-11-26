import React from 'react';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => {
    return {
      footer: {
        marginTop: 'auto',
      },
      wrapper: {
        marginTop: theme.spacing(2),
        backgroundColor:
          theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
        padding: theme.spacing(5, 2),
      }
    }
  });

function PageHeader({maxWidth, children}) {
    const classes = useStyles()
    return (
      <footer className={classes.footer}>
        <div className={classes.wrapper}>
          <Container maxWidth={maxWidth}>
            <Typography variant="body1">TODO</Typography>
          </Container>
        </div>
      </footer>
    )
}

export default PageHeader;