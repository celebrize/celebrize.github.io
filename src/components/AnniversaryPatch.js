import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { grey, pink, yellow} from '@material-ui/core/colors';
import moment from 'moment';

const useStyles = makeStyles((theme) => {
    const styles = {
        root: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            padding: theme.spacing(1, 2),
            textAlign: "center",
            textTransform: "uppercase",
            textSize: "0.8rem",
            lineHeight: "1.5em",
            fontWeight: "bold",
        },
        past: {
            backgroundColor: grey[900],
            color: theme.palette.getContrastText(grey[900]),
        },
        today: {
            backgroundColor: pink.A400,
            color: theme.palette.getContrastText(pink.A400),
        },
        highlight: {
            backgroundColor: yellow.A700,
            color: theme.palette.getContrastText(yellow.A700),
        },
    }
    return styles
});


function AnniversaryPatch({now, anniversary, highlightIf}) {
    const thisDate = moment(anniversary.getDateObject()).startOf("day")
    const thisNow = moment(now).startOf("day")
    const isPast = thisDate.isBefore(thisNow)
    const isToday = thisDate.isSame(thisNow)
    const isHighlight = anniversary.getOddity() <= highlightIf

    const classes = useStyles()

    if (isToday) {
        return (<div className={classes.root + " " + classes.today}>Today</div>)
    } else if(isPast) {
        return (<div className={classes.root + " " + classes.past}>Past</div>)
    } else if(isHighlight) {
        return (<div className={classes.root + " " + classes.highlight}>Highlight</div>)
    } else {
        return ""
    }
}

export default AnniversaryPatch;
