import React, {FC, useEffect, useRef, useState} from "react";
import CustomButton from "../../atoms/button/button";
import CustomPaperAtom from "../../atoms/custom-paper/custom-paper.atom";
import AddIcon from '@mui/icons-material/Add';
import CustomCollapse from "../../atoms/collpase/custom-collapse";
import {SocialForm} from "../../molecules/social-form/social-form";
import {SocialModel} from "../../../models/social.model";
import {ShowSocial} from '../../molecules/show-social/show-social'
import {Text} from '../../atoms/text/text'
import {UseAddOne, UseDeleteOne, UseGetAll, UseUpdateOne} from "../../../api/social.api";
import {ItemProps} from "../../atoms/CustomSelect/custom-select";
import InstagramIcon from "@mui/icons-material/Instagram";
import {pink} from "@mui/material/colors";
import FacebookIcon from "@mui/icons-material/Facebook";
import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WebIcon from "@mui/icons-material/Web";
import {toast, ToastContainer} from "react-toastify";
import EditIcon from '@mui/icons-material/Edit';
const FirstLevelOrganism: FC = () => {

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

    const [collapsed, setCollapsed] = useState<boolean>(false);
    const [resetForm, setResetForm] = useState<boolean | null>(null);
    const [socials, setSocials] = useState<SocialModel[]>([]);
    const [newSocial, setNewSocial] = useState<SocialModel>(new SocialModel());
    const [editingSocial, setEditingSocial] = useState<SocialModel>(new SocialModel());
    const [editMode, setEditMode] = useState<boolean>(false);
    const [editingIndex, setEditingIndex] = useState<number>(-1);
    const [removingId, setRemovingId] = useState<string>('');

    const resetFormRef = useRef<any>()
    resetFormRef.current = resetForm;
    const setCollapseRef = useRef<any>();
    setCollapseRef.current = collapsed;
    const socialsRef = useRef<any>();
    socialsRef.current = socials;
    const newSocialRef = useRef<any>();
    newSocialRef.current = newSocial;

    const editModeRef = useRef<any>()
    editModeRef.current = editMode;

    const editingIndexRef = useRef<any>()
    editingIndexRef.current = editingIndex;

    const {status, data, refetch: getAllRefetch} = UseGetAll();
    const {data: addSocialResponse, refetch: addSocialRefetch} = UseAddOne(newSocial);
    const {data: removeSocialResponse, refetch: removeSocialRefetch} = UseDeleteOne(removingId);
    const {data: updateSocialResponse, refetch: updateSocialRefetch} = UseUpdateOne(editingSocial);

    useEffect(() => {
        getAllRefetch();
    }, [])

    useEffect(() => {
        const socials = valuingTypes(data);
        setSocials(socials);
    }, [data])

    useEffect(() => {
        getAllRefetch();
    }, [addSocialResponse, updateSocialResponse])

    useEffect(() => {
        console.log(socials);
    }, [socials])

    useEffect(() => {
        if (removingId) {
            removeSocialRefetch().then(res => {
                getAllRefetch();
            })
        }
    }, [removingId])


    const endWork = () => {
        setResetForm(!resetFormRef.current)
        setCollapsed(!setCollapseRef.current)
        setEditingIndex(-1);
        setEditMode(false);
    }

    const socialChanged = (value: SocialModel) => {
        setNewSocial(value);
    }

    const toastExiting = () => {
        toast.error('مسیر ارتباطی با این مشخصات موجود است', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    const isExist = (value: SocialModel) => {
        const socials: SocialModel[] = socialsRef.current;
        if (!editMode) {
            const sameSocial = socials.find(i => i.social_id === value.social_id && i.social_link === value.social_link && i.type_id === value.type_id);
            if (sameSocial) {
                toastExiting();
                return false;
            } else {
                return true;
            }
        } else {
            const sameSocial = socials.find(i => i.social_id === value.social_id &&
                i.social_link === value.social_link && i.type_id === value.type_id && i.id !== value.id);
            if (sameSocial) {
                toastExiting();
                return false;
            } else {
                return true;
            }
        }
    }

    const addSocial = async (value: SocialModel) => {
        const editingMode: boolean = editModeRef.current;
        const flag = isExist(value);
        if (!flag) {
            return;
        }
        if (!editingMode) {
            if (!value.social_link && !value.typeIcon && !value.typeName && !value.type_id) {
                return
            }
            setNewSocial(value);
            setTimeout(() => {
                addSocialRefetch();
            }, 1)
        } else {
            if (!value.id && !value.social_link && !value.typeIcon && !value.typeName && !value.type_id) {
                return
            }
            setEditingSocial(value);
            setTimeout(() => {
                updateSocialRefetch();
            }, 1)
        }
        endWork();

    }

    useEffect(()=>{
        console.log(editingSocial)
    },[editingSocial])

    const removeSocial = (index: number) => {
        const lastSocials: SocialModel[] = socialsRef.current;
        if (lastSocials[index])
            setRemovingId(lastSocials[index].id);
    }

    const editSocial = (index: number) => {
        setEditMode(true)
        setEditingIndex(index);
        setCollapsed(true);
        const socials: SocialModel[] = socialsRef.current;
        const editingSocial = socials[index];
        setEditingSocial(new SocialModel(editingSocial));
    }

    const valuingTypes = (socials: SocialModel[]) => {
        if (socials) {
            return socials.map((social) => {
                const findingType = types.find(i => i.value === social.type_id);
                if (findingType) {
                    social.typeIcon = findingType.icon;
                    social.typeName = findingType.label;
                }
                return social;
            });
        } else {
            return [];
        }

    }

    return <CustomPaperAtom hasPadding padding={20}>
        <Text margin='0 0 12px 0' color="#7d8791" fontSize={12}>
            مسیر های ارتباطی
        </Text>

        <CustomButton margin="0 0 10px 0" fontSize={12} customColor="#ffa82b" onClick={() => {
            setCollapsed(!collapsed)
        }} icon={!editMode ? <AddIcon fontSize="small"/> : <EditIcon  fontSize="small"/> } text={!editMode ? 'افزودن مسیر ارتباطی' : 'ویرایش مسیر ارتباطی'}/>


        <CustomCollapse  headerNone={true} collapsed={collapsed}>
            <SocialForm editMode={editMode} addSocial={addSocial} endWork={endWork} editingSocial={editingSocial}
                        socialChanged={socialChanged} resetForm={resetForm}/>
        </CustomCollapse>

        <ShowSocial onEdit={editSocial} onRemove={removeSocial} socials={socials}/>
        <ToastContainer />

    </CustomPaperAtom>
}

export default FirstLevelOrganism;
