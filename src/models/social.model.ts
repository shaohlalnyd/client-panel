export class SocialModel {
    id: string;
    social_id:string;
    social_link: string;
    type_id: number|null;
    typeName: string;
    typeIcon: any;

    constructor(input?: SocialModel) {
        this.id = input?.id || '';
        this.social_link = input?.social_link || '';
        this.social_id = input?.social_id || '';
        this.type_id = input?.type_id || null;
        this.typeName = input?.typeName || '';
        this.typeIcon = input?.typeIcon || null;
    }

}
