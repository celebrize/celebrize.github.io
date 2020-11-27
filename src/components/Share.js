import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import SpeedDial from '@material-ui/lab/SpeedDial'
import SpeedDialAction from '@material-ui/lab/SpeedDialAction'
import { FileCopyOutlined } from '@material-ui/icons'
import ShareIcon from '@material-ui/icons/Share'

import { green, red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  speedDial: {
    position: "fixed",
    bottom: theme.spacing(3),
    right: theme.spacing(3),
  },
  tooltipOk: {
    backgroundColor: green[900],
  },
  tooltipError: {
    backgroundColor: red[900],
  },
}));

function Share(props) {
    const classes = useStyles()
    const [speedDialOpen, setSpeedDialOpen] = useState(false)
    const [copyOk, setCopyOk] = useState(null)

    const copyUriToClipboard = () => {
      if (!navigator || !navigator.clipboard || !window || !window.location) {
        setCopyOk(false)
        return
      }

      navigator.clipboard.writeText(window.location.href).then(() => {
        setCopyOk(true)
      }).catch((err) => {
        console.error(err)
        setCopyOk(false)
      })
    }

    return (<>
        <SpeedDial
          ariaLabel="SpeedDial example"
          className={classes.speedDial}
          icon={<ShareIcon />}
          onClose={() => {
            setCopyOk(null)
            setSpeedDialOpen(false)
          }}
          onOpen={() => {
            setCopyOk(null)
            setSpeedDialOpen(true)
          }}
          open={speedDialOpen}
          direction={"up"}
        >
            <SpeedDialAction
                key="copy link"
                icon={<FileCopyOutlined />}
                tooltipTitle={copyOk === true ? "Ok" : (copyOk === false ? "Failed" : "Copy link to your clipboard")}
                onClick={copyUriToClipboard}
                TooltipClasses={{ tooltip: copyOk === true ? classes.tooltipOk : (copyOk === false ? classes.tooltipError : undefined) }}
            />
        </SpeedDial>
    </>)
    
}

export default Share;
