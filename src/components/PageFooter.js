import React, {useState} from 'react';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Link } from '@material-ui/core';
import About from '../pages/dialog/About'
import Faq from '../pages/dialog/Faq'
import { githubUri, xopnUri } from '../static'

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
              <Link className={classes.navItem} href={githubUri} target="_blank" rel="noreferrer noopener">Contribute</Link>
              <Typography className={classes.navItem} component="div">Made with ❤ by <Link href={xopnUri} target="_blank" rel="noreferrer noopener">xopn</Link></Typography>
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