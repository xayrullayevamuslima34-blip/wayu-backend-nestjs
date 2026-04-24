import { Column, Entity, OneToMany } from 'typeorm';
import { News } from './news.entity';
import {BaseModel} from "../../../core/base.model";

@Entity('newsCategories')
export class NewsCategory extends BaseModel {
    @Column({ unique: true, length: 64 })
    title!: string;

    @OneToMany(() => News, (news) => news.category)
    news!: News[];
}