import {FC, useState} from "react";
import {SocialModel} from "../../../models/social.model";
import styled from "styled-components";
import {Text} from '../../atoms/text/text'
import {Row} from "../../atoms/row/row";
import CustomButton from "../../atoms/button/button";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {Box, Modal} from "@mui/material";
import {Remove} from "../remove/remove";

interface ComponentProps {
    social: SocialModel,
    onRemove: Function,
    onEdit: Function
}

const SocialRowElement = styled.div`
    width:calc(100% - 24px);
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding:12px;
`

const SocialRowDataElement = styled.div`
    flex:1;
    display:flex;
    flex-wrap:wrap;
    align-items:center;
    justify-content:flex-start;
`

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    boxShadow: 24,

};


export const SocialRow: FC<ComponentProps> = (props) => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const remove = () => {
        props.onRemove();
    }

    return <SocialRowElement>
        <SocialRowDataElement>
            {props.social.typeIcon}
            <Text margin="0 14px" fontSize={18} color="white">
                {props.social.typeName}
            </Text>
            <Row>
                <Text fontSize={12} color="#818b95" margin="0 5px">آی دی (ID):</Text>
                <Text direction="ltr">@{props.social.social_id}</Text>
            </Row>

            <Row margin="0 15px">
                <Text fontSize={12} color="#818b95" margin="0 5px">لینک :</Text>
                <Text direction="ltr" color="#be9362">{props.social.social_link}</Text>
            </Row>
        </SocialRowDataElement>
        <Row>
            <CustomButton onClick={() => props.onEdit()} customColor="#be9362" text="ویرایش"
                          icon={<EditIcon className="icon"/>}></CustomButton>

            <CustomButton onClick={() => handleOpen()} customColor="#ed4f4d" text="حذف"
                          icon={<DeleteIcon className="icon"/>}></CustomButton>
        </Row>

        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Remove onRemove={remove} onClose={handleClose} removingText={props.social.social_id}/>
            </Box>
        </Modal>
        

    </SocialRowElement>
}
