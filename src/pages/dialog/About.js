import React, { useState } from 'react'
import Dialog from './Dialog';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
    avatar: {
        float: "right",
        margin: theme.spacing(0, 0, 4, 4),
        width: theme.spacing(11),
        height: theme.spacing(11),
    }
  }));

function About({isOpen, handleClose}) {
    const classes = useStyles()

    return (<Dialog
        title="About"
        contentText="Hi! Nice to meet you."
        isOpen={isOpen}
        handleClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <Avatar variant="rounded" className={classes.avatar} alt="a plush penguin and Chris" src="xopn.jpg" />
        <p>This is me, Chris – right side of the picture.</p>
        <p>
            A few years back I asked myself the questions how many seconds I lived on this earth. After some programmer's
            math I realised that I was almost one billion seconds old. So I invited a bunch of friends over for a little party
            and even got some awesome presents out of it. Out of curiosity – and the desire for more presents – I wrote a small
            script that calculated upcoming, uncommon birthdays and realised there where quite a few. Unfortunately this
            script never made it off of my computer.
        </p>
        <p>
            Then recently I was looking for a project to learn the basics of <Link href="https://reactjs.org/" target="_blank" rel="nofollow noreferrer noopener">React</Link>.
            This old script popped back into my head. So I did a rewrite and added a few new calculations. And this is how the project was born.
        </p>
        <p><strong>
            If it makes you laugh or gives you a reason to spend time with friends it served its purpose.
        </strong></p>
        <p>And if you like it, please share the fun.</p>
      </Dialog>)
}

export default About
