import React, {FC} from "react";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";

interface ComponentProps {
    collapsed: boolean,
    headerNone?: boolean,
    backgroundColor?: string
}

const CustomCollapse: FC<ComponentProps> = (props) => {
    return <Accordion
        style={{width: '100%', backgroundColor: !props.backgroundColor ? '#333c47' : props.backgroundColor}}
        expanded={props.collapsed}>
        <AccordionSummary style={{minHeight: props.headerNone ? 0 : '', height: props.headerNone ? 0 : ''}}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
        >
        </AccordionSummary>
        <AccordionDetails>
            {props.children}
        </AccordionDetails>
    </Accordion>
}

export default CustomCollapse;
