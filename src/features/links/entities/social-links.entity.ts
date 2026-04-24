import { Column, Entity } from 'typeorm';
import {BaseModel} from "../../../core/base.model";

@Entity('socialLinks')
export class SocialLink extends BaseModel {
    @Column({ length: 64 })
    title!: string;

    @Column({ length: 128 })
    icon!: string;

    @Column({ length: 128 })
    link!: string;
}
