import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import SpeedDial from '@material-ui/lab/SpeedDial'
import SpeedDialAction from '@material-ui/lab/SpeedDialAction'
import { FileCopyOutlined } from '@material-ui/icons'
import ShareIcon from '@material-ui/icons/Share'
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import { appName, appShareText } from '../static'

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

function whatsappShareLink(text) {
    //@see https://faq.whatsapp.com/general/chats/how-to-use-click-to-chat
    return `https://wa.me/?text=${encodeURIComponent(text)}`
}
function twitterShareLink(text) {
    //@see https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/overview
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
}
function facebookShareLink(uri) {
    return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(uri)}`
}

function Share(props) {
    const classes = useStyles()
    const [speedDialOpen, setSpeedDialOpen] = useState(false)
    const [copyOk, setCopyOk] = useState(null)
    const supportsClipboard = navigator && navigator.clipboard && window && window.location
    const supportsShareApi = navigator && navigator.share && window && window.location

    const copyUriToClipboard = () => {
      if (!supportsClipboard) {
        return
      }

      navigator.clipboard.writeText(window.location.href).then(() => {
        setCopyOk(true)
      }).catch((err) => {
        console.error(err)
        setCopyOk(false)
      })
    }

    const onOpen = () => {
      const openSpeedDial = () => {
        setCopyOk(null)
        setSpeedDialOpen(true)
      }
      if (supportsShareApi) {
        setSpeedDialOpen(false)
        navigator.share({
          title: appName,
          text: appShareText,
          url: window.location.href,
        }).then(() => {
          // success
        }).catch((error) => {
          console.log(error)
          openSpeedDial()
        })
      } else {
        openSpeedDial()
      }
      
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
          onOpen={onOpen}
          open={speedDialOpen}
          direction={"up"}
        >
        { supportsClipboard && (
          <SpeedDialAction
            key="copy link"
            icon={<FileCopyOutlined />}
            tooltipTitle={copyOk === true ? "Ok" : (copyOk === false ? "Failed" : "Copy link to your clipboard")}
            onClick={copyUriToClipboard}
            tooltipOpen={copyOk !== null}
            TooltipClasses={{ tooltip: copyOk === true ? classes.tooltipOk : (copyOk === false ? classes.tooltipError : undefined) }}
          />
        )}
        <SpeedDialAction
          key="whatsapp"
          icon={<WhatsAppIcon />}
          tooltipTitle="Share with WhatsApp"
          onClick={() => window.open(whatsappShareLink(appShareText + ": " + window.location.href), "_blank")}
        />
        <SpeedDialAction
          key="twitter"
          icon={<TwitterIcon />}
          tooltipTitle="Share with Twitter"
          onClick={() => window.open(twitterShareLink(appShareText + ": " + window.location.href), "_blank")}
        />
        <SpeedDialAction
          key="facebook"
          icon={<FacebookIcon />}
          tooltipTitle="Share with Facebook"
          onClick={() => window.open(facebookShareLink(window.location.href), "_blank")}
        />
      </SpeedDial>
    </>)
    
}

export default Share;
