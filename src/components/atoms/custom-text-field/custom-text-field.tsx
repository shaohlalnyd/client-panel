import {styled, TextField} from "@mui/material";
import React, {FC, InputHTMLAttributes} from "react";
import {useField, useFormikContext} from "formik";

interface ComponentProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    value?: any;
    customOnChange?: Function;
    placeHolder?: string;
    name: string
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

export const CustomTextField: FC<ComponentProps> = (props) => {


    const {setFieldValue} = useFormikContext();
    const [field, meta] = useField(props.name || '');


    const handleChange = (evt: any) => {
        const {value} = evt.target;
        setFieldValue(props.name!, value);
        if (props.customOnChange) {
            props.customOnChange(value);
        }
    }

    const configTextField: any = {
        ...field,
        ...props,
        fullWidth: true,
        variant: 'outlined',
        onChange: handleChange
    }

    if (meta && meta.touched && meta.error) {
        configTextField.error = true;
        configTextField.helperText = meta.error;
    }

    return <CustomTextFieldElement value={props.value} {...configTextField}/>


}
