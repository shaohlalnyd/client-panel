import {Paper, styled} from "@mui/material";

interface ComponentProp {
    backgroundColor?: string,
    hasPadding?: boolean
    padding?: number
}

const CustomPaperAtom = styled(Paper)<ComponentProp>((props) => ({
    backgroundColor: props.backgroundColor || "#202a34",
    width: `calc( 100% - ${props.padding ? props.padding * 2 + 'px' : '0px'})`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: props.hasPadding ? props.padding || '10px' : ''
}))

export default CustomPaperAtom;
