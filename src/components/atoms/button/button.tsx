import {Button, styled} from "@mui/material";
import {FC} from "react";
import {amber} from "@mui/material/colors";

interface ComponentProps {
    text?: string;
    icon?: any;
    onClick?: () => void;
    customColor?: string;
    backgroundColor?: string;
    disabled?: boolean;
    fontSize?: number;
    type?: 'button' | 'submit',
    border?: string,
    margin?:string
}

const CustomButtonelement = styled(Button)<ComponentProps>((props) => ({
    color: props.customColor || props.theme.palette.getContrastText(amber[50]),
    backgroundColor: props.backgroundColor || '',
    'svg': {
        marginLeft: '10px'
    },
    fontSize: `${props.fontSize}px` || '',
    border: props.border || '',
    margin : props.margin || ''
}))


const CustomButton: FC<ComponentProps> = (props) => {


    return <CustomButtonelement margin={props.margin} border={props.border} type={props.type || 'button'} disabled={props.disabled}
                                customColor={props.customColor}
                                backgroundColor={props.backgroundColor}
                                onClick={props.onClick} fontSize={props.fontSize}>
        {props.icon || null}
        {props.text || ''}
    </CustomButtonelement>
}

export default CustomButton;
