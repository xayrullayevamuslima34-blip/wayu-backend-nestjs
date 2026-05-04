import { BaseModel } from "src/core/base.model";
import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import {EventCategories} from "../event-categories/event-categories.entity";
import type {Relation} from "typeorm";


@Entity('events')
export class Event extends BaseModel {
    @Column()
    categoryId!: number;

    @ManyToOne(() => EventCategories, (eventCategory) => eventCategory.events)
    @JoinColumn({ name: 'categoryId' })
    category!: Relation<EventCategories>;

    @Column({ length: 256 })
    title!: string;

    @Column({ type: 'text' })
    content!: string;

    @Column({ length: 128 })
    image!: string;

    @Column({ type: 'timestamp' })
    date!: Date;

    @Column({ length: 128 })
    address!: string;
}
