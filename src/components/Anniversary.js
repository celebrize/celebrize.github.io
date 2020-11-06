import React, { useState } from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import {amber, blue, blueGrey, brown, common, cyan, deepOrange, deepPurple, green, grey, indigo, lightBlue, lightGreen, lime, orange, pink, purple, red, teal, yellow} from '@material-ui/core/colors';
import RelativeDay from './RelativeDay';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import DownloadIcon from '@material-ui/icons/Save';
import BackIcon from '@material-ui/icons/Undo';
import TimePeriod from '../domain/period_generator';
import images from '../data/images';

const colors = [
    amber, blue, blueGrey, brown, common, cyan, deepOrange,
    deepPurple, green, grey, indigo, lightBlue, lightGreen,
    lime, orange, pink, purple, red, teal, yellow
]
const tileWidth = 268
const spacing = 6
const tileHeight = 268

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
        flex: {
            display: "flex",
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            alignItems: "center",
            padding: "16px 0 16px 16px",
        },
        tileInfoWrap: {
            flexGrow: 1,
        },
        tileInfoButton: {
            color: 'rgba(255, 255, 255, 0.5)',
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
            lineHeight: "1.5em",
            color: '#fff',
        },
        attribution: {
            fontSize: "0.6rem",
            lineHeight: "1.2em",
            color: '#999',
            '& a': {
                color: '#999',
                textDecoration: "none",
                fontWeight: "bold",
                '&:hover, &:focus': {
                    color: "#ccc",
                }
            },
        },
        mb: {
            marginBottom: "0.5rem",
        },
    }

    colors.forEach((color, i) => {
        styles[`tile-${i}`] = {
            backgroundColor: color[200]
        }
    })

    return styles
});

function selectImageFor(anniversary) {
    const id = anniversary.getStaticId()
    const matches = []
    const perfectMatches = []

    images.forEach(image => {
        const isMatch = image.isMatch(anniversary)
        if (isMatch === true) { perfectMatches.push(image) }
        else if (isMatch === null) { matches.push(image) }
    })

    if (perfectMatches.length > 0) {
        // if there are perfect matches: pick one of these
        const imgId = Math.floor(id % perfectMatches.length)
        return perfectMatches[imgId]
    } else {
        // else pick something arbitrary
        const imgId = Math.floor(id % matches.length)
        return matches[imgId]
    }
}

function Anniversary(props) {
    const [isFlipped, setFlipped] = useState(false)

    const classes = useStyles()
    const anniversary = props.anniversary
    console.log(anniversary)
    const id = anniversary.getStaticId()
    const colorId = Math.floor(id % colors.length)
    const image = selectImageFor(anniversary)

    const flip = () => setFlipped(!isFlipped)

    return (
        <Grid item xs="6">
            <Paper className={classes.tile + " " + classes["tile-" + colorId]}>
                <img src={image.getImageHotLink(tileWidth, tileHeight)} alt="" width="100%" height="100%" />
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

                        <div className={classes.flex}>
                            <div className={classes.tileInfoWrap + " " + classes.attribution}>
                                Photo by <a href={image.getImageHtmlLink()} target="blank">{image.getAuthorName()}</a> on <a href={image.getUnsplashHtmlLink()} target="_blank">Unsplash</a>
                            </div>
                            <IconButton aria-label="" className={classes.tileInfoButton}>
                                <DownloadIcon />
                            </IconButton>
                            <IconButton aria-label="" className={classes.tileInfoButton} onClick={flip}>
                                <BackIcon />
                            </IconButton>
                        </div>
                    </div>
                ) : (
                    <div className={classes.tileInfoRoot}>
                        <div className={classes.tileInfoWrap}>
                            <div className={classes.title}>{anniversary.getNumberLabel() + " " + anniversary.getPeriodLabel()}</div>
                            <div className={classes.subtitle}><RelativeDay day={anniversary.getDateObject()} /></div>
                        </div>
                        <IconButton aria-label="" className={classes.tileInfoButton} onClick={flip}>
                            <InfoIcon />
                        </IconButton>
                    </div>
                )}
            </Paper>
        </Grid>
    )
}

export default Anniversary;
