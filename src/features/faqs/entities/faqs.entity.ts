import { Column, Entity } from 'typeorm';
import {BaseModel} from "../../../core/base.model";

@Entity('faqs')
export class Faqs extends BaseModel {
    @Column({ length: 256 })
    question!: string;

    @Column({ length: 512 })
    answer!: string;
}
