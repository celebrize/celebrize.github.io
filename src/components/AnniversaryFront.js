import React from 'react';
import { Typography, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RelativeDay from './RelativeDay';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles((theme) => {
    const styles = {
        root: {
            display: "flex",
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            alignItems: "center",
            padding: theme.spacing(2, 0, 2, 2),
        },
        container: {
            flexGrow: 1,
        },

        title: {
            fontSize: "1rem",
            lineHeight: "2rem",
            flexGrow: "1",
            color: '#fff',
            overflow: "hidden",
        },
        text: {
            fontSize: "0.75rem",
            lineHeight: "1.5em",
            color: '#fff',
            "& a": {
                color: "#aaa",
                textDecoration: "none",
                fontWeight: "bold",
                "&:hover, &:focus": {
                    color: "#fff",
                }
            }
        },
        button: {
            color: 'rgba(255, 255, 255, 0.5)',
        },
    }
    return styles
});


function AnniversaryFront({title, date, onClickInfoButton}) {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <Typography variant="h6" classes={{"h6": classes.title}} noWrap={true}>{title}</Typography>
                <Typography variant="body1" classes={{"body1": classes.text}}><RelativeDay day={date} /></Typography>
            </div>
            <IconButton aria-label="" className={classes.button} onClick={onClickInfoButton}>
                <InfoIcon />
            </IconButton>
        </div>
    )
}

export default AnniversaryFront;
