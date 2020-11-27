import React, { useState } from 'react'
import Dialog from './Dialog';
import Link from '@material-ui/core/Link';
import Accordion from '../../components/Accordion'

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
                This page is built as an <Link href="https://reactjs.org/" target="_blank" rel="nofollow noreferrer noopener">React App</Link>.
                This means it is running on your computer / laptop / smartphone and all calculations happen there. None of the things you enter
                will leave your browser.
            </p>
            <p>
                This pages is hosted on <Link href="https://pages.github.com/" target="_blank" rel="nofollow noreferrer noopener">Github Pages</Link> and
                uses images hosted by <Link href="https://unsplash.com/" target="_blank" rel="nofollow noreferrer noopener">Unsplash</Link>. But this is
                just your browser requesting files from there as it would on any other website.
            </p>
            <p>
                Also, we <em>do not use</em> any tracking technology, like Google Analytics, Adobe Analytics, or similar.
            </p>
        </Accordion>
        <Accordion id="dummy-2" currentOpenId={opened} title="Accordion 2" onOpen={setOpened}>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                sit amet blandit leo lobortis eget.
            </p>
        </Accordion>
        <Accordion id="dummy-3" currentOpenId={opened} title="Accordion 3" onOpen={setOpened}>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                sit amet blandit leo lobortis eget.
            </p>
        </Accordion>
      </Dialog>)
}

export default Faq
