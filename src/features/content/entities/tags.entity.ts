import { Column, Entity } from 'typeorm';
import {BaseModel} from "../../../core/base.model";

@Entity('tags')
export class Tags extends BaseModel {
    @Column({ unique: true, length: 64 })
    title!: string;
}
