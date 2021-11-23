import {FC} from "react";
import styled from "styled-components";

interface ComponentProps {
    margin?: string;
    flex?: string;
    justifyContent?: string;
    fullWidth?: boolean
}

const RowElement = styled.div<ComponentProps>`
    display:flex;
    align-items:center;
    margin:${props => props.margin || ''};
    flex:${props => props.flex || ''};
    justify-content:${props => props.justifyContent || 'flex-start'};
    width:${props => props.fullWidth ? '100%' : 'auto'};
`

export const Row: FC<ComponentProps> = (props) => {
    return <RowElement {...props} >
        {props.children}
    </RowElement>
}
