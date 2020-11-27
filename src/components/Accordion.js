import React, { useState } from 'react'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function MyAccordion({id, currentOpenId, title, children, onOpen}) {
    const isCurrent = id === currentOpenId

    return (
        <Accordion
            expanded={isCurrent}
            onChange={(e, expanded) => { onOpen(id) }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={id + "-panel"}
                id={id}
            >
                {isCurrent ? (
                    <Typography><strong>{title}</strong></Typography>
                ) : (
                    <Typography>{title}</Typography>
                )}
                
            </AccordionSummary>
            <AccordionDetails>
                <Typography
                    component="div"
                    paragraph={false}
                >{children}</Typography>
            </AccordionDetails>
        </Accordion>
    )
}

export default MyAccordion
