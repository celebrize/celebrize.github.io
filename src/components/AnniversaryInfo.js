import React from 'react'
import { Typography } from '@material-ui/core';
import AnniversaryTile from './AnniversaryTile';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => {
    const styles = {
        root: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignContent: "stretch",
            alignItems: "stretch",
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            padding: theme.spacing(2),
        },

        body: {
            flexGrow: "1",
            verticalAlign: "middle",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
        },
        title: {
            fontSize: "1rem",
            lineHeight: "2rem",
            marginBottom: theme.spacing(1),
        },
        text: {
            fontSize: "0.75rem",
            lineHeight: "1.5em",
            paddingLeft: theme.spacing(4),
            textIndent: theme.spacing(-4),
            marginBottom: theme.spacing(0.5),
            "& a": {
                color: "#aaa",
                textDecoration: "none",
                fontWeight: "bold",
                "&:hover, &:focus": {
                    color: "#fff",
                }
            }
        },
    }

    return styles
});

function AnniversaryInfo() {
    const classes = useStyles()
    return (
        <AnniversaryTile>
            <div className={classes.root}>
            <div className={classes.body}>
                <Typography paragraph={true}>Didn't find anything suitable? Try some other dates that are important to you, like</Typography>
                <ul>
                    <Typography component="li">When you started your current occupation</Typography>
                    <Typography component="li">When you finished school</Typography>
                    <Typography component="li">An important event in your life</Typography>
                </ul>
            </div>
            </div>
        </AnniversaryTile>
    )
}

export default AnniversaryInfo