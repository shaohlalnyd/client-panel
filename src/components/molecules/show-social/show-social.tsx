import {FC} from "react";
import styled from "styled-components";
import CustomPaperAtom from "../../atoms/custom-paper/custom-paper.atom";
import {SocialModel} from "../../../models/social.model";
import {SocialRow} from "../social-row/social-row";

interface ComponentProps {
    socials: SocialModel[],
    onRemove: Function,
    onEdit: Function
}

const ShowSocialElem = styled.div``

export const ShowSocial: FC<ComponentProps> = (props) => {
    return <CustomPaperAtom  backgroundColor="#333c47">
        {
            props.socials.map((social, index) => {
                return <SocialRow onEdit={() => props.onEdit(index)}
                                  onRemove={() => props.onRemove(index)} social={social}/>
            })
        }
    </CustomPaperAtom>
}
