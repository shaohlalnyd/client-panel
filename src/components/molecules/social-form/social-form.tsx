import {Grid} from "@mui/material";
import React, {FC, useEffect, useState} from "react";
import {CustomSelect, ItemProps} from "../../atoms/CustomSelect/custom-select";
import {CustomTextField} from "../../atoms/custom-text-field/custom-text-field";
import {SocialModel} from "../../../models/social.model";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WebIcon from '@mui/icons-material/Web';
import {pink} from '@mui/material/colors';
import * as Yup from 'yup';
import {Form, Formik} from "formik";
import CustomButton from "../../atoms/button/button";
import {Row} from "../../atoms/row/row";
import {Text} from "../../atoms/text/text";

interface ComponentProps {
    resetForm?: boolean | null
    socialChanged: Function
    editingSocial?: SocialModel,
    endWork: Function,
    addSocial: Function,
    editMode: boolean
}

export const SocialForm: FC<ComponentProps> = (props) => {

    const types: ItemProps[] = [
        {
            label: 'اینستاگرام',
            value: 1,
            icon: <InstagramIcon sx={{color: pink[50]}}/>
        },
        {
            label: 'فیسبوک',
            value: 2,
            icon: <FacebookIcon sx={{color: pink[50]}}/>
        },
        {
            label: 'تلگرام',
            value: 3,
            icon: <TelegramIcon sx={{color: pink[50]}}/>
        },
        {
            label: 'توییتر',
            value: 4,
            icon: <TwitterIcon color="action"/>
        },
        {
            label: 'لینکدین',
            value: 5,
            icon: <LinkedInIcon sx={{color: pink[50]}}/>
        },
        {
            label: 'وب سایت',
            value: 6,
            icon: <WebIcon sx={{color: pink[50]}}/>
        }
    ]

    const [social, setSocial] = useState<SocialModel>(new SocialModel());

    const [returnedSocial, setReturnedSocial] = useState<SocialModel>(new SocialModel());

    const [initialValues, setInitialValues] = useState({
        social_id: '',
        social_Link: '',
        type_id: 0
    });

    const validationSchema = Yup.object({
        type_id: Yup.number().min(1, 'وارد کردن این فیلد الزامی است').required('وارد کردن این فیلد الزامی است'),
        social_Link: Yup.string().required('وارد کردن این فیلد الزامی است'),
        social_id: Yup.string().required('وارد کردن این فیلد الزامی است'),
    })

    useEffect(() => {
        if (props.resetForm !== null) {
            resetForm();
        }
    }, [props.resetForm])

    useEffect(() => {
        const editingSocial = props.editingSocial;
        if (editingSocial && editingSocial?.type_id && editingSocial.social_link && editingSocial.social_id) {

            setSocial(editingSocial!);
            setInitialValues({
                type_id: editingSocial.type_id!,
                social_Link: editingSocial.social_link,
                social_id: editingSocial.social_id
            })
        }
    }, [props.editingSocial])

    useEffect(() => {
        console.log(social)
    }, [social])

    useEffect(() => {
        if (returnedSocial !== new SocialModel()) {
            props.socialChanged(returnedSocial);
        }
    }, [returnedSocial])

    const valuingEditingSocial = (social: SocialModel) => {
        setInitialValues({
            social_id: social.social_id,
            social_Link: social.social_link,
            type_id: social.type_id as number || 0
        })
        setReturnedSocial(social);
    }

    const resetForm = () => {
        setInitialValues({
            type_id: 0,
            social_id: '',
            social_Link: ''
        })
    }

    const typeChanged = (value: number) => {
        const findingType = types.find(i => i.value === value);
        if (findingType) {
            setSocial((prev) => ({
                ...prev,
                typeName: findingType.label,
                typeIcon: findingType.icon
            }))
        }
    }

    const getSocialName = (id: number | null) => {
        const findingType = types.find(i => i.value === id);
        if (findingType) {
            return findingType.label;
        } else {
            return ''
        }
    }

    return <Formik enableReinitialize initialValues={initialValues} validationSchema={validationSchema}
                   onSubmit={(values, {resetForm}) => {
                       props.addSocial(new SocialModel({
                           social_id: values.social_id,
                           social_link: values.social_Link,
                           type_id: values.type_id,
                           id: social.id,
                           typeIcon: social.typeIcon,
                           typeName: social.typeName
                       }));

                       resetForm();
                   }}>
        {
            formik => {
                return <Form>
                    <Text width="fit-content" >{!props.editMode ? "افزودن مسیر ارتباطی" : `ویرایش مسیر ارتباطی ${getSocialName(social.type_id)}`}</Text>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={4}>
                            <CustomSelect customOnChange={(value: any) => {
                                typeChanged(value)
                            }} name="type_id" items={types}
                                          label="نوع"/>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <CustomTextField value={formik.values.social_Link} label="لینک" name="social_Link"/>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <CustomTextField value={formik.values.social_id} name="social_id" label="آیدی(ID)"/>
                        </Grid>

                        <Row fullWidth margin="15px 16px 0 16px" justifyContent="flex-end">
                            <CustomButton fontSize={12} margin="0 0px 0 10px" customColor="white" border="1px solid white" text="انصراف" onClick={() => {
                                props.endWork();
                                formik.resetForm()
                            }}/>
                            <CustomButton fontSize={12} margin="0 10px 0 0" backgroundColor="#ffa82b" type="submit"
                                          text={!props.editMode ? "ثبت مسیر ارتباطی" : `ویرایش مسیر ارتباطی ${getSocialName(social.type_id)}`}
                            />
                        </Row>

                    </Grid>
                </Form>
            }
        }

    </Formik>

}
