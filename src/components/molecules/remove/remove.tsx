import {FC, useState} from "react";
import CustomPaperAtom from "../../atoms/custom-paper/custom-paper.atom";
import {Text} from "../../atoms/text/text";
import {CustomTextField} from "../../atoms/custom-text-field/custom-text-field";
import CustomButton from "../../atoms/button/button";
import {Row} from "../../atoms/row/row";
import {CustomTextFieldWtFormik} from "../../atoms/custom-text-field/custom-text-field-wt-formik";

interface ComponentProps {
    removingText?: string;
    onClose: Function;
    onRemove: Function
}

export const Remove: FC<ComponentProps> = (props) => {
    const [confirmText, setConfirmText] = useState<string>('');


    return <CustomPaperAtom hasPadding={true}>
        <Text color="white" fontSize={16}>آیا از تصمیم خود مطمئن هستید ؟</Text>
        <Text>برای حذف مسیر ارتباطی {props.removingText} لطفا تایید را بنویسید</Text>
        <CustomTextFieldWtFormik label="" placeHolder="تایید" value={confirmText}
                         customOnChange={(value: string) => setConfirmText(value)}/>

        <Row fullWidth margin="10px 0 0 0" justifyContent='flex-end'>
            <CustomButton onClick={() => props.onClose()} customColor="#ffa82e" text="انصراف"/>
            <CustomButton disabled={confirmText !== 'تایید'} onClick={() => {
                props.onRemove();
                props.onClose()
            }} customColor="red"
                          text="حذف"/>
        </Row>

    </CustomPaperAtom>
}
