import { Column, Entity, OneToMany,  } from 'typeorm';
import {BaseModel} from "../../../core/base.model";
import { Branch } from '../../organization/branches/branches.entity';
import type {Relation} from 'typeorm';
import { News } from '../../news/news/news.entity';

@Entity('countries')
export class Country extends BaseModel {
    @Column({ unique: true, length: 64 })
    title!: string;

    @Column({ length: 128 })
    flag!: string;

    @OneToMany(() => Branch, (branch) => branch.country)
    branch?: Relation<Branch[]>

    @OneToMany(() => News, (news) => news.country)
    news?: Relation<News[]>
}