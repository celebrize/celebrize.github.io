import { Container, Paper, Avatar, makeStyles, Typography } from '@material-ui/core'
import Markdown from 'markdown-to-jsx'
import React from 'react'
import Carousel from 'react-material-ui-carousel'
import { appName } from '../static'
import FormatQuoteIcon from '@material-ui/icons/FormatQuote'
import ExternalLink from './ExternalLink'

const useStyles = makeStyles((theme) => {
    return {
        paper: {
            display: "flex",
            padding: theme.spacing(2),
        },
        paperText: {
            position: "relative",
            paddingLeft: theme.spacing(4),
            flexGrow: 1,
            background: FormatQuoteIcon,
        },
        quote: {
            position: "relative",
            zIndex: 1,
            paddingBottom: theme.spacing(4),
        },
        quoteIcon: {
            position: "absolute",
            zIndex: 0,
            top: theme.spacing(-3),
            left: theme.spacing(1),
            fontSize: 60,
            color: theme.palette.grey[300],
        },
        name: {
            position: "absolute",
            bottom: 0,
            right: 0,
            color: theme.palette.grey[800],
        },
        avatar: {
            width: 64,
            height: 64,
        },
        disclaimer: {
            textAlign: "right",
            fontSize: "smaller",
            color: theme.palette.grey[600],
            "& a": {
                color: "inherit",
                fontWeight: "bold",
            }
        }
    }
})

const testimonials = [
    {
        name: "Yusuf, 28",
        quote: `Thank you, _${appName}_! Thanks to your website I could double my present income last year.`,
        image: "image01.jpg",
    },
    {
        name: "Barbara, 42",
        quote: `I was born on christmas eve. Understandably none of my friends want to show up when I turn one year older. _${appName}_ helps me find diffent birthdays to celebrate.`,
        image: "image04.jpg",
    },
    {
        name: "Karl-Gunther, 31",
        quote: `This year I got sick and had to cancel my birthday party. But next month I will celebrate my 1.000.000.000th second on earth.`,
        image: "image10.jpg",
    },
    {
        name: "Timmy, 6",
        quote: `Why don't adults let me go into pubs? I am 18 years old! On mercury.`,
        image: "image02.jpg",
    },
    {
        name: "Claire, 19",
        quote: `I forgot my boyfriend's birthday yesterday. Now he is angry at me. But I don't understand why! He forgot my ten millionth minute on earth last week, too.`,
        image: "image08.jpg",
    },
    {
        name: "Arthur, 55",
        quote: `Names and birthdays are not my strong suit. When one of my employees brings birthday cake and I forgot to gratulate them, I always check _${appName}_ for their next birthday and mark it in my calendar. They are surprised when I gratulate them.`,
        image: "image12.jpg",
    },
    {
        name: "Margareth, 62",
        quote: `I always wanted to have an outdoor birthday party in summer, but I was born in February. _${appName}_ gave me the idea to invite people over the 700th moon cycle since my birth.`,
        image: "image03.jpg",
    },
    {
        name: "Sana, 38",
        quote: `Today I've sent out invites for my party. I turn 1234567890 seconds next month.`,
        image: "image05.jpg",
    },
    {
        name: "Olaf, 42",
        quote: `I just celebrated my first birthday under a star-lit sky. Space is so huge that we could watch Capella – one of the brightest stars – and see light radiated at the day I was born. It was a sublime experience.`,
        image: "image06.jpg",
    },
].map(t => {
    t.random = Math.random()
    return t
}).sort((a, b) => a.random-b.random)

function Testimonial({name, quote, image}) {
    const classes = useStyles()
    return (<Paper className={classes.paper}>
        <Avatar className={classes.avatar} alt={name} src={"avatar/" + image} />
        <div className={classes.paperText}>
            <FormatQuoteIcon className={classes.quoteIcon} />
            <Typography className={classes.quote}><Markdown>{quote}</Markdown></Typography>
            <Typography className={classes.name} variant="caption" display="block" gutterBottom>
                {name}
            </Typography>
        </div>
    </Paper>)
}

function Testimonials() {
    const classes = useStyles()
    return (<Container maxWidth="sm">
        <Carousel
            interval={10000}
            navButtonsAlwaysInvisible={true} // they don't work well with z-index and look ugly
        >
            { testimonials.map(t => (<Testimonial
                name={t.name}
                quote={t.quote}
                image={t.image}
                key={t.image}
            />))}
        </Carousel>
        <Typography className={classes.disclaimer} variant="caption" display="block" gutterBottom>Sorry, those people <ExternalLink href="https://thispersondoesnotexist.com/">do not exist.</ExternalLink></Typography>
    </Container>)

}

export default Testimonials