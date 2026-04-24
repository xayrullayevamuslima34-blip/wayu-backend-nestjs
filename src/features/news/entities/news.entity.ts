import { BaseModel } from "src/core/base.model";
import {
    Column,
    Entity,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import {Country} from "../../gegrapy/entities/contries.entity";
import {NewsCategory} from "./news-categories.entity";

@Entity('news')
export class News extends BaseModel {
    @ManyToOne(() => NewsCategory, (c) => c.news)
    @JoinColumn({ name: 'categoryId' })
    category!: NewsCategory;

    @ManyToOne(() => Country, { nullable: true })
    @JoinColumn({ name: 'countryId' })
    country?: Country;

    @Column({ length: 256 })
    title!: string;

    @Column({ length: 128 })
    image!: string;

    @Column({ type: 'date' })
    date!: string;

    @Column({ type: 'text' })
    content!: string;
}