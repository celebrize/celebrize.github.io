import React, { useState } from 'react'
import Dialog from './Dialog';
import Link from '@material-ui/core/Link';
import ExternalLink from '../../components/ExternalLink'
import Accordion from '../../components/Accordion'
import { githubIssuesUri, githubPullsUri } from '../../static'

function Faq({isOpen, handleClose}) {
    const [opened, setOpened] = useState()

    return (<Dialog
        title="Questions &amp; Answers"
        isOpen={isOpen}
        handleClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <Accordion id="privacy-1" currentOpenId={opened} title="What happens to the date I enter?" onOpen={setOpened}>
            <p>
                This page is built as an <ExternalLink href="https://reactjs.org/">React App</ExternalLink>.
                This means it is running on your computer / laptop / smartphone and all calculations happen there. None of the things you enter
                will leave your browser.
            </p>
            <p>
                This pages is hosted on <ExternalLink href="https://pages.github.com/">Github Pages</ExternalLink> and
                uses images hosted by <ExternalLink href="https://unsplash.com/">Unsplash</ExternalLink>. But this is
                just your browser requesting files from there as it would on any other website.
            </p>
            <p>
                Also, we <em>do not use</em> any tracking technology, like Google Analytics, Adobe Analytics, or similar.
            </p>
        </Accordion>
        <Accordion id="time-1" currentOpenId={opened} title="Why can I enter a time?" onOpen={setOpened}>
            <p>
                The time is used for some calculations, like your age in seconds. Depending on if you were born
                early in the morning or late at night, your birthday could be in either one of two days.
            </p>
            <p>
                But you can just leave the time at the default – and we asume you were born at noon. This gives correct results in most cases.
                Most of your friends would not notice the difference anyways.
            </p>
        </Accordion>
        <Accordion id="contribute-1" currentOpenId={opened} title="You are missing a very important reason to celebrate, namely..." onOpen={setOpened}>
            <p>
                That's a great idea you have there. Please let me know by <ExternalLink href={githubIssuesUri}>opening an issue</ExternalLink> or 
                {' '}<ExternalLink href={githubPullsUri}>open a pull request</ExternalLink>.
            </p>
        </Accordion>
      </Dialog>)
}

export default Faq
