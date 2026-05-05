import { Column, Entity } from 'typeorm';
import {BaseModel} from "@/core/base.model";

@Entity('usefulLinks')
export class UsefulLink extends BaseModel {
    @Column({ length: 128 })
    title!: string;

    @Column({ length: 128 })
    icon!: string;

    @Column({ length: 128 })
    link!: string;
}
