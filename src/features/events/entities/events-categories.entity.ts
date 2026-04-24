import { Column, Entity, OneToMany } from 'typeorm';
import {BaseModel} from "../../../core/base.model";
import {Event} from './events.entity'

@Entity('eventCategories')
export class EventCategory extends BaseModel {
    @Column({ type: 'varchar', length: 64, unique: true })
    title!: string;

    @OneToMany(() => Event, (event) => event.category)
    events!: Event[];
}