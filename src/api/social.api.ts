import {useQuery} from "react-query";
import axios from "axios";
import {SocialModel} from "../models/social.model";

export const UseGetAll = () => {
    return useQuery("socials", async () => {
        const {data} = await axios.get('http://localhost:3030/socials');
        return data;
    }, {refetchOnWindowFocus: false, enabled: false})
}

export const UseAddOne = (body: any) => {
    return useQuery('addSocials', async () => {
        delete body.typeName;
        delete body.typeIcon;
        delete body.id;
        const {data} = await axios.post('http://localhost:3030/socials', body);
        return data;
    }, {refetchOnWindowFocus: false, enabled: false})
}

export const UseDeleteOne = (id: string) => {
    return useQuery('addSocials', async () => {
        const {data} = await axios.delete(`http://localhost:3030/socials/${id}`);
        return data;
    }, {refetchOnWindowFocus: false, enabled: false})
}

export const UseUpdateOne = (body: any) => {
    delete body.typeName;
    delete body.typeIcon;
    return useQuery('updateSocials', async () => {
        const {data} = await axios.put(`http://localhost:3030/socials/${body.id}`, body);
        return data;
    }, {refetchOnWindowFocus: false, enabled: false})
}
