import {FormControl, InputLabel, MenuItem, Select, styled, TextField} from "@mui/material";
import {FC} from "react";
import {useField, useFormikContext} from "formik";
import {makeStyles} from "@mui/styles";

interface ComponentInterface {
    value?: any
    label: string
    customOnChange?: Function
    items: ItemProps[]
    name: string
}

export interface ItemProps {
    label: string
    value: number
    icon: any
}

const CustomSelectElement = styled(Select)({
    '.MuiOutlinedInput-notchedOutline': {
        borderColor: '#818b95',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'white',
    },

    'input': {
        color: 'white',
        padding: '12px 14px'
    },

    '.MuiFormLabel-root': {
        color: 'white'
    },

    '.MuiSvgIcon-root': {
        color: 'white'
    },
    '& label': {
        color: 'white'
    },
    '& label.Mui-focused': {
        color: 'white',
    },
    '& .MuiInputBase-formControl': {
        '&:hover fieldset': {
            borderColor: 'white',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'white',
        },
    }
});

const useStyles = makeStyles({
    root: {
        width: '100%',
        "& .MuiOutlinedInput-input": {
            color: "white"
        },
        "& .MuiInputLabel-root": {
            color: "white"
        },
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#818b95"
        },
        '& .MuiSelect-select': {
            padding: '12px 14px'
        },
        "&:hover .MuiOutlinedInput-input": {
            color: "white"
        },
        "&:hover .MuiInputLabel-root": {
            color: "white"
        },
        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "white"
        },
        '& svg': {
            color: 'white'
        },
        '& .Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: '#d32f2f'
        },
        "& .Mui-error":{
            color:"red"
        }
    }
});

export const CustomSelect: FC<ComponentInterface> = (props) => {

    const {setFieldValue} = useFormikContext();
    const [field, meta] = useField(props.name || '');
    const classes = useStyles();
    const handleChange = (evt: any) => {
        const {value} = evt.target;
        setFieldValue(props.name, value);
        if (props.customOnChange) {
            props.customOnChange(value);
        }
    }

    if (props.name) {
        const configSelect: any = {
            ...field,
            ...props,
            variant: 'outlined',
            onChange: handleChange
        }

        if (meta && meta.touched && meta.error) {
            console.log(configSelect)
            configSelect.error = true;
            configSelect.helperText = meta.error;
        }

        return <TextField
            className={classes.root}
            {...configSelect}
            fullWidth
            select
        >
            {
                props.items.map(item => {
                    return <MenuItem value={item.value}>{item.label}</MenuItem>
                })
            }
        </TextField>
        // <FormControl fullWidth>
        //     <InputLabel error={!!configSelect.helperText} id="demo-simple-select-label">{props.label}</InputLabel>
        //     <Select className={classes.root} color='primary'
        //         {...configSelect}
        //     >
        //         {
        //             props.items.map(item => {
        //                 return <MenuItem value={item.value}>{item.label}</MenuItem>
        //             })
        //         }
        //     </Select>
        //     {
        //         configSelect.helperText ? <FormHelperText error color="red">{configSelect.helperText}</FormHelperText> : null
        //     }
        // </FormControl>
    } else {
        return <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
            <CustomSelectElement
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={props.value}
                label={props.label}
                onChange={(e) => props.customOnChange!(e.target.value)}
            >
                {
                    props.items.map(item => {
                        return <MenuItem value={item.value}>{item.label}</MenuItem>
                    })
                }
            </CustomSelectElement>
        </FormControl>
    }


}
