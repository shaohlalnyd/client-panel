import {styled, TextField} from "@mui/material";
import React, {FC} from "react";

interface ComponentProps {
    label: string;
    value?: any;
    customOnChange?: Function;
    placeHolder?: string
}

const CustomTextFieldElement = styled(TextField)({
    'input': {
        color: 'white',
        padding: '12px 14px'
    },
    '& label': {
        color: 'white'
    },
    '& label.Mui-focused': {
        color: 'white',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#818b95',
        },
        '&:hover fieldset': {
            borderColor: 'white',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'white',
        },
    }
});

export const CustomTextFieldWtFormik: FC<ComponentProps> = (props) => {

    return <CustomTextFieldElement fullWidth value={props.value || ''} onChange={(e) => props.customOnChange!(e.target.value)}
                      id="outlined-basic"
                      placeholder={props.placeHolder || ''}
                      label={props.label}
                      variant="outlined"
    />

}
