import { Column, Entity } from 'typeorm';
import {BaseModel} from "../../../core/base.model";

@Entity('representatives')
export class Representative extends BaseModel {
    @Column({ length: 64 })
    fullName!: string;

    @Column({ length: 128 })
    image!: string;

    @Column({ length: 64 })
    email!: string;

    @Column({ length: 16 })
    phoneNumber!: string;

    @Column({ type: 'text' })
    resume!: string;
}