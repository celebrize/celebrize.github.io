import React, { useState } from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import {amber, blue, blueGrey, brown, common, cyan, deepOrange, deepPurple, green, grey, indigo, lightBlue, lightGreen, lime, orange, pink, purple, red, teal, yellow} from '@material-ui/core/colors';
import RelativeDay from './RelativeDay';
import UnsplashImg from './UnsplashImg';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import TimePeriod from '../domain/period_generator';

const colors = [
    amber, blue, blueGrey, brown, common, cyan, deepOrange,
    deepPurple, green, grey, indigo, lightBlue, lightGreen,
    lime, orange, pink, purple, red, teal, yellow
]
const tileWidth = 268
const spacing = 6
const tileHeight = 178

const useStyles = makeStyles((theme) => {
    const styles = {
        tile: {
            position: "relative",
            height: tileHeight,
            color: "#fff",
            alignItems: "center",

        },
        backTileBar: {
            height: "100%",
        },
        backTileBarSubtitle: {
            lineHeight: "1rem",
            whiteSpace: "initial",
        },
        tileInfoRoot: {
            display: "flex",
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            alignItems: "center",
            padding: "16px 0 16px 16px",
        },
        tileInfoWrap: {
            flexGrow: 1,
        },
        tileInfoButton: {
            color: "#fff",
        },
        tileBacksideRoot: {
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            padding: "16px",
        },
        title: {
            fontSize: "1rem",
            lineHeight: "1.5rem",
            flexGrow: "1",
            color: '#fff',
            overflow: "hidden",
        },
        subtitle: {
            fontSize: "0.75rem",
            lineHeight: "1.25rem",
            color: '#fff',
        },
        mb: {
            marginBottom: "0.5rem",
        },
        icon: {
            color: 'rgba(255, 255, 255, 0.5)',
        },
    }

    colors.forEach((color, i) => {
        styles[`tile-${i}`] = {
            backgroundColor: color[200]
        }
    })

    return styles
});

// @TODO: outsource and make sure we attribute the author
const imgIds = [
    "1509805735646-2f72b3272a7d",
    "1513201099705-a9746e1e201f",
    "1512308795231-7800e7ed6220",
    "1517398741578-fc1e1a3c6c1b",
    "1523757956233-94a86ff74ea5",
    "1595385157889-ad253a606825",
    "1486427944299-d1955d23e34d",
    "1529244927325-b3ef2247b9fb",
    "1558979235-9b4b27d624fa",
    "1502035618526-6b2f1f5bca1b",
]

function Anniversary(props) {
    const [isFlipped, setFlipped] = useState(false)

    const classes = useStyles()
    const anniversary = props.anniversary
    const id = anniversary.getStaticId()
    const colorId = Math.floor(id % colors.length)
    const imgId = Math.floor(id % imgIds.length)

    const flip = () => setFlipped(!isFlipped)

    return (
        <Grid item xs="6">
            <Paper className={classes.tile + " " + classes["tile-" + colorId]} onClick={flip}>
                <UnsplashImg id={imgIds[imgId]} width={tileWidth} height={tileHeight} />
                { isFlipped ? (
                    <div className={classes.tileBacksideRoot}>
                        <div className={classes.title}>{anniversary.getPrecision() === TimePeriod.DAYS ? anniversary.getDateObject().toLocaleDateString() : anniversary.getDateObject().toLocaleString()}</div>
                        <div className={classes.subtitle}>
                            <strong>{anniversary.getNumberLabel()}</strong>{anniversary.getNumberHelpText() ? 
                            (anniversary.hasDecimalLabel() ? ` = ${anniversary.getDecimalLabel()}` : "" ) + ": " + anniversary.getNumberHelpText() : ""}
                        </div>
                        <div className={classes.subtitle}>
                            <strong>{anniversary.getPeriodLabel()}</strong>{anniversary.getPeriodHelpText() ? ": " + anniversary.getPeriodHelpText() : ""}
                        </div>
                    </div>
                ) : (
                    <div className={classes.tileInfoRoot}>
                        <div className={classes.tileInfoWrap}>
                            <div className={classes.title}>{anniversary.getNumberLabel() + " " + anniversary.getPeriodLabel()}</div>
                            <div className={classes.subtitle}><RelativeDay day={anniversary.getDateObject()} /></div>
                        </div>
                        <IconButton aria-label="" className={classes.tileInfoButton}>
                            <InfoIcon />
                        </IconButton>
                    </div>
                )}
            </Paper>
        </Grid>
    )
}

export default Anniversary;
