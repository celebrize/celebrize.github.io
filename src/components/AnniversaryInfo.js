import React from 'react'
import { Typography, Divider, Button } from '@material-ui/core';
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
            backgroundColor: "rgba(0, 0, 0, 0.85)",
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
    }

    return styles
});

function AnniversaryInfo({children}) {
    const classes = useStyles()
    return (
        <AnniversaryTile>
            <div className={classes.root}>
            <div className={classes.body}>
                {children}
            </div>
            </div>
        </AnniversaryTile>
    )
}

export default AnniversaryInfo