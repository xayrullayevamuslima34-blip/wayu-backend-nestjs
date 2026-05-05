import { Column, Entity, OneToMany } from 'typeorm';
import {Event} from '../events/events.entity'
import { BaseModel } from '@/core/base.model';
import type {Relation} from 'typeorm';


@Entity('eventCategories')
export class EventCategories extends BaseModel {
    @Column({ type: 'varchar', length: 64, unique: true })
    title!: string;

    @OneToMany(() => Event, (event) => event.category)
    events!: Relation<Event[]>;
}