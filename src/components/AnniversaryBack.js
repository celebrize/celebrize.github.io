import React, { useState } from 'react';

import { Typography, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import BackIcon from '@material-ui/icons/Undo';
import TimePeriod from '../domain/period';
import MyMarkdown from './MyMarkdown';
import moment from 'moment';
import ExternalLink from './ExternalLink'

const useStyles = makeStyles((theme) => {
    return {
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
            backgroundColor: "rgba(0, 0, 0, 0.75)",
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
        title: {
            fontSize: "1rem",
            lineHeight: "2rem",
            marginBottom: theme.spacing(1),
        },
        text: {
            fontSize: "0.75rem",
            lineHeight: "1.5em",
            paddingLeft: theme.spacing(4),
            textIndent: theme.spacing(-4),
            marginBottom: theme.spacing(0.5),
            "& a": {
                color: "#aaa",
                textDecoration: "none",
                fontWeight: "bold",
                "&:hover, &:focus": {
                    color: "#fff",
                }
            }
        },

        footer: {
            display: "flex",
            alignItems: "center",
            marginRight: theme.spacing(-2),
        },
        footerText: {
            flexGrow: 1,
        },
        footerButton: {
            color: 'rgba(255, 255, 255, 0.5)',
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
    }
});

function AnniversaryBack({anniversary, image, onClickBackButton}) {
    const classes = useStyles()
    
    return (
        <div className={classes.root}>
            <div className={classes.body}>
                <div>
                    <Typography variant="h6" classes={{"h6": classes.title}} noWrap={true}>{moment(anniversary.getDateObject()).format(anniversary.getPrecision() === TimePeriod.DAYS ? 'LL': 'LLL')}</Typography>
                    <Typography variant="body1" classes={{"body1": classes.text}}>
                        <strong>{anniversary.getNumberLabel()}</strong>
                        {anniversary.hasDecimalLabel() ? ` = ${anniversary.getDecimalLabel()}` : ""}
                        {anniversary.getNumberHelpText() ? ": " : ""}{anniversary.getNumberHelpText() ? (<MyMarkdown>{anniversary.getNumberHelpText()}</MyMarkdown>) : ""}
                    </Typography>
                    <Typography variant="body1" classes={{"body1": classes.text}}>
                        <strong>{anniversary.getPeriodLabel()}</strong>{anniversary.getPeriodHelpText() ? ": " : ""}{anniversary.getPeriodHelpText() ? (<MyMarkdown>{anniversary.getPeriodHelpText()}</MyMarkdown>) : ""}
                    </Typography>
                </div>
            </div>
            <div className={classes.footer}>
                <Typography variant="body1" classes={{"body1": classes.footerText + " " + classes.attribution}}>
                    Photo by <ExternalLink href={image.getImageHtmlLink()}>{image.getAuthorName()}</ExternalLink> on <ExternalLink href={image.getUnsplashHtmlLink()}>Unsplash</ExternalLink>
                </Typography>
                {/*<IconButton aria-label="" className={classes.footerBottom}>
                    <DownloadIcon />
                </IconButton>*/}
                <IconButton aria-label="" className={classes.footerButton} onClick={onClickBackButton}>
                    <BackIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default AnniversaryBack;
