import React, {FC} from 'react'
import styled from 'styled-components'


const H3Element = styled.h3`
    display:flex
`

export const H3: FC = (props) => {
    return <H3Element>
        {props.children}
    </H3Element>
}
