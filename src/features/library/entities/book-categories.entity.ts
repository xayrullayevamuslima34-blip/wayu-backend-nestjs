import { Column, Entity } from 'typeorm';
import {BaseModel} from "../../../core/base.model";

@Entity('bookCategories')
export class BookCategory extends BaseModel {
    @Column({ unique: true, length: 64 })
    title!: string;
}