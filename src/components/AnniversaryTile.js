import React, { useState } from 'react';

import { Grid, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => {
    const styles = {
        spacer: {
            // makes sure the boxes are square
            display: "block",
            paddingBottom: "100%",
            width: "100%",
        },
        img: {
            // the image is positioned absolutely, so the box height is determined by .square
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
        },
        tile: {
            position: "relative",
            color: "#fff",
            alignItems: "center",
            height: "100%",

        },
    }

    return styles
});

function AnniversaryTile({tileClass, imageUri, children}) {
    const classes = useStyles()

    return (
        <Grid item xs={12} sm={6} md={4} zeroMinWidth>
            <Card className={classes.tile + (tileClass ? " " + tileClass : "")}>
                <div className={classes.spacer}></div>
                {imageUri ? (<img className={classes.img} src={imageUri} alt="" width="100%" height="100%" />) : "" }
                {children}
            </Card>
        </Grid>
    )
}

export default AnniversaryTile;
