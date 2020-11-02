import React, { useState } from 'react';

import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { makeStyles } from '@material-ui/core/styles';
import {amber, blue, blueGrey, brown, common, cyan, deepOrange, deepPurple, green, grey, indigo, lightBlue, lightGreen, lime, orange, pink, purple, red, teal, yellow} from '@material-ui/core/colors';
import RelativeDay from './RelativeDay';

const colors = [
    amber, blue, blueGrey, brown, common, cyan, deepOrange,
    deepPurple, green, grey, indigo, lightBlue, lightGreen,
    lime, orange, pink, purple, red, teal, yellow
]
const tileWidth = 250
const tileHeight = 150

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

function Anniversary(props) {
    const [isFlipped, setFlipped] = useState(false)

    const classes = useStyles()
    const anniversary = props.anniversary
    const key = anniversary.getTime()

    console.log(anniversary)
    const flip = () => setFlipped(!isFlipped)
    const helpText = (anniversary) => {
        return (<div>
            <div className={classes.mb}>
                <strong>{anniversary.getNumberLabel()}</strong>{anniversary.getNumberHelpText() !== undefined ? 
                (anniversary.hasDecimalLabel() ? ` = ${anniversary.getDecimalLabel()}` : "" ) + ": " + anniversary.getNumberHelpText() : ""}
            </div>
            <div>
                <strong>{anniversary.getPeriodLabel()}</strong>{anniversary.getPeriodHelpText() !== undefined ? ": " + anniversary.getPeriodHelpText() : ""}
            </div>
        </div>)
    }

    return (
        <GridListTile key={key} className={classes.tile + " " + classes[`tile-${Math.floor(Math.random() * Math.floor(colors.length))}`]} onClick={flip}>
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
