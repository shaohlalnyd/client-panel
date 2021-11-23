import React, {FC} from 'react'
import styled from 'styled-components'


const H4Element = styled.h4`
    
`

export const H4: FC = (props) => {
    return <H4Element>
        {props.children}
    </H4Element>
}
