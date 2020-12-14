import React, {useState} from 'react';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Link } from '@material-ui/core';
import ExternalLink from '../components/ExternalLink';
import About from '../pages/dialog/About'
import Faq from '../pages/dialog/Faq'
import { githubUri, xopnUri, instagramHandle, twitterHandle } from '../static'
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';

const useStyles = makeStyles((theme) => {
    return {
      footer: {
        marginTop: 'auto',
      },
      wrapper: {
        marginTop: theme.spacing(2),
        backgroundColor:
          theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
        padding: theme.spacing(5, 2),
      },
      flex: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
      },
      navItem: {
        padding: theme.spacing(0, 1),
      }
    }
  });

function PageHeader({maxWidth, children}) {
    const classes = useStyles()
    const [isAboutOpen, setIsAboutOpen] = useState(false)
    const [isFaqOpen, setIsFaqOpen] = useState(false)

    const openAbout = e => {
      e.preventDefault()
      setIsAboutOpen(true)
    }
    const openFaq = e => {
      e.preventDefault()
      setIsFaqOpen(true)
    }

    return (<>
      <footer className={classes.footer}>
        <div className={classes.wrapper}>
          <Container maxWidth={maxWidth}>
            <Typography className= {classes.flex} variant="body1" component="nav">
              <Link className={classes.navItem} href="#" onClick={openAbout}>About</Link>
              <Link className={classes.navItem} href="#" onClick={openFaq}>Q&amp;A</Link>
              <ExternalLink className={classes.navItem} href={githubUri}>Contribute</ExternalLink>
              { twitterHandle && (
                <ExternalLink className={classes.navItem} href={`https://twitter.com/${twitterHandle}`}><TwitterIcon /></ExternalLink>
              )}
              { instagramHandle && (
                <ExternalLink className={classes.navItem} href={`https://instagram.com/${instagramHandle}/`}><InstagramIcon /></ExternalLink>
              )}
              <Typography className={classes.navItem} component="div">Made with ❤ by <ExternalLink href={xopnUri}>xopn</ExternalLink></Typography>
            </Typography>
          </Container>
        </div>
      </footer>
      { isAboutOpen && (
        <About isOpen={isAboutOpen} handleClose={() => setIsAboutOpen(false)} />
      )}
      { isFaqOpen && (
        <Faq isOpen={isFaqOpen} handleClose={() => setIsFaqOpen(false)} />
      )}
    </>)
}

export default PageHeader;