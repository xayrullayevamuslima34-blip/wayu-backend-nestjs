import { Column, Entity } from 'typeorm';
import {BaseModel} from "@/core/base.model";

@Entity('languages')
export class Language extends BaseModel {
    @Column({ length: 64 })
    title!: string;
}