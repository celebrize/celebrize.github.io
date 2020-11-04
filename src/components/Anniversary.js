import React, { useState } from 'react';

import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { makeStyles } from '@material-ui/core/styles';
import {amber, blue, blueGrey, brown, common, cyan, deepOrange, deepPurple, green, grey, indigo, lightBlue, lightGreen, lime, orange, pink, purple, red, teal, yellow} from '@material-ui/core/colors';
import RelativeDay from './RelativeDay';
import UnsplashImg from './UnsplashImg';

const colors = [
    amber, blue, blueGrey, brown, common, cyan, deepOrange,
    deepPurple, green, grey, indigo, lightBlue, lightGreen,
    lime, orange, pink, purple, red, teal, yellow
]
const tileWidth = 270
const tileHeight = 180

const useStyles = makeStyles((theme) => {
    const styles = {
        tile: {
            width: tileWidth,
            minHeight: tileHeight,
        },
        backTileBar: {
            height: "100%",
        },
        backTileBarSubtitle: {
            lineHeight: "1rem",
            whiteSpace: "initial",
        },
        mb: {
            marginBottom: "0.5rem",
        },
        icon: {
            color: 'rgba(255, 255, 255, 0.54)',
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
    const helpText = (anniversary) => {
        return (<div>
            <div className={classes.mb}>
                <strong>{anniversary.getNumberLabel()}</strong>{anniversary.getNumberHelpText() ? 
                (anniversary.hasDecimalLabel() ? ` = ${anniversary.getDecimalLabel()}` : "" ) + ": " + anniversary.getNumberHelpText() : ""}
            </div>
            <div>
                <strong>{anniversary.getPeriodLabel()}</strong>{anniversary.getPeriodHelpText() ? ": " + anniversary.getPeriodHelpText() : ""}
            </div>
        </div>)
    }

    return (
        <GridListTile key={id} className={classes.tile + " " + classes[`tile-${colorId}`]} onClick={flip}>
            <UnsplashImg id={imgIds[imgId]} width={tileWidth} height={tileHeight} />
            { isFlipped ? (
                <GridListTileBar
                    className={classes.backTileBar}
                    classes={{subtitle: classes.backTileBarSubtitle, title: classes.mb}}
                    title={anniversary.date.toLocaleDateString()}
                    subtitle={helpText(anniversary)}
                />
            ) : (
                <GridListTileBar
                    title={anniversary.getNumberLabel() + " " + anniversary.getPeriodLabel()}
                    subtitle={RelativeDay({day: anniversary.date})}
                />
            )}
        </GridListTile>
    )
}

export default Anniversary;
