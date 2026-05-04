import { Column, Entity } from 'typeorm';
import {BaseModel} from "../../../core/base.model";

@Entity('staticInfo')
export class StaticInfo extends BaseModel {
    @Column({ nullable: true, length: 128 })
    appStoreLink?: string;

    @Column({ nullable: true, length: 128 })
    playMarketLink?: string;

    @Column({ type: 'text' })
    aboutUs!: string;
}

