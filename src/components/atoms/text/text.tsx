import React, {FC} from "react";
import styled from "@emotion/styled";

interface ComponentProps {
    color?: string;
    fontSize?: number;
    margin?: string;
    direction?: 'ltr' | 'rtl',
    width?:string
}

const TextElement = styled.p<ComponentProps>`
    color:${props => props.color || 'white'};
    font-size:${props => props.fontSize || 14}px;
    margin:${props => props.margin || ''};
    direction:${props => props.direction || ''};
    width:${props => props.width || ''}
`

export const Text: FC<ComponentProps> = (props => {
    return <TextElement  {...props}>
        {props.children}
    </TextElement>
})
