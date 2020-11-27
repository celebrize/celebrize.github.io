import React, {useState} from 'react';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Link } from '@material-ui/core';
import About from '../pages/dialog/About'
import Faq from '../pages/dialog/Faq'

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
            <Typography variant="body1">
              <Link href="#" onClick={openAbout}>About</Link>
              <Link href="#" onClick={openFaq}>Q&amp;A</Link>
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