import React, { useState } from 'react';

import { Grid, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {amber, blue, blueGrey, brown, common, cyan, deepOrange, deepPurple, green, grey, indigo, lightBlue, lightGreen, lime, orange, pink, purple, red, teal, yellow} from '@material-ui/core/colors';
import images from '../data/images';
import { useTheme } from '@material-ui/styles';
import AnniversaryPatch from './AnniversaryPatch';
import AnniversaryFront from './AnniversaryFront';
import AnniversaryBack from './AnniversaryBack';

const colors = [
    amber, blue, blueGrey, brown, common, cyan, deepOrange,
    deepPurple, green, grey, indigo, lightBlue, lightGreen,
    lime, orange, pink, purple, red, teal, yellow
]
const tileWidth = 400
const spacing = 6
const tileHeight = 400

const useStyles = makeStyles((theme) => {
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

function Anniversary(props) {
    const [isFlipped, setFlipped] = useState(false)

    const classes = useStyles()
    const theme = useTheme()

    const anniversary = props.anniversary
    const highlightIf = props.highlightIf
    const id = anniversary.getStaticId()
    const colorId = Math.floor(id % colors.length)
    const image = selectImageFor(anniversary)

    const flip = () => setFlipped(!isFlipped)

    return (
        <Grid item xs="12" sm="6" md="4" zeroMinWidth>
            <Card className={classes.tile + " " + classes["tile-" + colorId]}>
                <div className={classes.spacer}></div>
                <img className={classes.img} src={image.getImageHotLink(tileWidth, tileHeight)} alt="" width="100%" height="100%" />
                { isFlipped ? (
                    <AnniversaryBack anniversary={anniversary} onClickBackButton={flip} image={image} />
                ) : (
                    <React.Fragment>
                        <AnniversaryPatch anniversary={anniversary} now={new Date()} highlightIf={highlightIf} />
                        <AnniversaryFront anniversary={anniversary} onClickInfoButton={flip} />
                    </React.Fragment>
                )}
            </Card>
        </Grid>
    )
}

export default Anniversary;
