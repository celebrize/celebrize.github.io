import React from 'react';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Typography } from '@material-ui/core';
import { appName, appTagLine } from '../static'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => {
    return {
        headerBand: {
          // @TODO: reduce file size
          background: "url('./adi-goldstein-Hli3R6LKibo-unsplash.jpg') top center no-repeat",
          backgroundSize: "cover",
          backgroundColor: theme.palette.primary.main,
          marginBottom: theme.spacing(2),
        },
        headerContainer: {
          [theme.breakpoints.only('xs')]: {
            padding: theme.spacing(2, 0),
          },
          [theme.breakpoints.up('sm')]: {
            padding: theme.spacing(2),
          },
        },
        headerGrid: {
          [theme.breakpoints.up('xs')]: {
            minHeight: theme.breakpoints.values.xs,
          },
          [theme.breakpoints.up('sm')]: {
            minHeight: theme.breakpoints.values.sm * 0.75,
          },
          [theme.breakpoints.up('md')]: {
            minHeight: theme.breakpoints.values.md * 0.75,
          }
        },
        headerBox: {
          width: "100%",
          background: "rgba(0,0,0,0.75)",
          borderRadius: "4px",
          padding: theme.spacing(3),

          [theme.breakpoints.only('xs')]: {
            width: "100%",
          },
          [theme.breakpoints.up('sm')]: {
            width: theme.breakpoints.values.xs * 1.7,
            margin: "0 auto",
          },
        },
        logo: {
          marginTop: "-12%",
          marginBottom: theme.spacing(2)
        },
        tagline:  {
          color: theme.palette.getContrastText(theme.palette.primary.main),
          textAlign: "right",
          fontWeight: "bold",
          fontSize: "1.5rem",
          marginTop: theme.spacing(-2),
          [theme.breakpoints.down('xs')]: {
            display: "none",
          },
        },
        subtitle: {
          color: theme.palette.getContrastText(theme.palette.primary.main),
        },
    }
  });

function PageHeader({subtitle, maxWidth, children}) {
    const classes = useStyles()
    return (
        <div className={classes.headerBand}>
            <Container className={classes.headerContainer} maxWidth={maxWidth}>
                <Grid container className={classes.headerGrid} justify="flex-start" alignItems="center">
                    <Grid item className={classes.headerBox}>
                        <Link to="/"><img className={classes.logo} src="logo.svg" width="100%" alt={appName} /></Link>
                        <Typography component="div" variant="subtitle1" className={classes.tagline}>{appTagLine}</Typography>
                        { subtitle ? (<p className={classes.subtitle}>{subtitle}</p>) : "" }
                        {children}
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default PageHeader;