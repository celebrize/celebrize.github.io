import React, { useState } from 'react';

import { Grid, Card, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {amber, blue, blueGrey, brown, common, cyan, deepOrange, deepPurple, green, grey, indigo, lightBlue, lightGreen, lime, orange, pink, purple, red, teal, yellow} from '@material-ui/core/colors';
import images from '../data/images';
import { useTheme } from '@material-ui/styles';
import MyMarkdown from './MyMarkdown';
import AnniversaryTile from './AnniversaryTile';
import AnniversaryPatch from './AnniversaryPatch';
import AnniversaryFront from './AnniversaryFront';
import AnniversaryBack from './AnniversaryBack';
import ExternalLink from './ExternalLink';


const colors = [
    amber, blue, blueGrey, brown, common, cyan, deepOrange,
    deepPurple, green, grey, indigo, lightBlue, lightGreen,
    lime, orange, pink, purple, red, teal, yellow
]
const tileWidth = 400
const tileHeight = 400

const useStyles = makeStyles(theme => {
    console.log(theme)
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

function Anniversary({anniversary, highlightIf}) {
    const [isFlipped, setFlipped] = useState(false)

    const classes = useStyles()

    const id = anniversary.getStaticId()
    const colorId = Math.floor(id % colors.length)
    const image = selectImageFor(anniversary)

    let title = ""
    let backText = ""
    if (anniversary.getNumberLabel && anniversary.getPeriodLabel) {
        title = anniversary.getNumberLabel() + " " + anniversary.getPeriodLabel()
        backText = (
        <>
            <Typography variant="body1">
                <strong>{anniversary.getNumberLabel()}</strong>
                {anniversary.hasDecimalLabel() ? ` = ${anniversary.getDecimalLabel()}` : ""}
                {anniversary.getNumberHelpText() ? ": " : ""}{anniversary.getNumberHelpText() ? (<MyMarkdown>{anniversary.getNumberHelpText()}</MyMarkdown>) : ""}
            </Typography>
            <Typography variant="body1">
                <strong>{anniversary.getPeriodLabel()}</strong>{anniversary.getPeriodHelpText() ? ": " : ""}{anniversary.getPeriodHelpText() ? (<MyMarkdown>{anniversary.getPeriodHelpText()}</MyMarkdown>) : ""}
            </Typography>
        </>)
    } else if (anniversary.getStarName) {
        title = anniversary.getStarName()
        const star = anniversary.getStar()
        backText = (<>
            <Typography variant="body1">
                {star.getWikipediaLink() ? (
                    <ExternalLink href={star.getWikipediaLink()}>{star.getName()}</ExternalLink>
                ) : star.getName()}
                is a star roughly {star.getDistance().toFixed(2)} light-years from earth. So you can see light from the day you were born.
            </Typography>
            {star.getAppearantMagnitude() < 2.5 ? (
                <Typography variant="body1">
                    It is one of the brightest stars in the night sky. So it is easy to spot with the naked eye.
                </Typography>
            ) : (
                star.getAppearantMagnitude() > 4.5 ? (
                    <Typography variant="body1">
                        It is not very bright, so a remote location and binoculars might be necessary.
                    </Typography>
                ) : (
                    ""
                )
            )}
            { star.getInTheSkyLink() ? (
                <Typography variant="body1">
                    <ExternalLink href={star.getInTheSkyLink() + `&day=${anniversary.getDateObject().getDate()}&month=${anniversary.getDateObject().getMonth() + 1}&year=${anniversary.getDateObject().getFullYear()}`}>in-the-sky.org</ExternalLink>
                </Typography>
            ) : "" }
            </>
        )
    }

    const flip = () => setFlipped(!isFlipped)

    return (
        <AnniversaryTile 
            imageUri={image.getImageHotLink(tileWidth, tileHeight)}
            tileClass={classes["tile-" + colorId]}
        >
            { isFlipped ? (
                <AnniversaryBack date={anniversary.getDateObject()} datePrecision={anniversary.getPrecision()} onClickBackButton={flip} image={image}>
                    {backText}
                </AnniversaryBack>
            ) : (
                <React.Fragment>
                    <AnniversaryPatch anniversary={anniversary} now={new Date()} highlightIf={highlightIf} />
                    <AnniversaryFront title={title} date={anniversary.getDateObject()} onClickInfoButton={flip} />
                </React.Fragment>
            )}
        </AnniversaryTile>
    )
}

export default Anniversary;
