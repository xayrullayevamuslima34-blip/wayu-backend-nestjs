import {
    Column,
    Entity,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import {BaseModel} from "../../../core/base.model";
import { Country } from "./contries.entity";
import {Representative} from "../../representatives/entities/representaties.entity";

@Entity('branches')
export class Branch extends BaseModel {
    @ManyToOne(() => Country)
    @JoinColumn({name: 'countryId'})
    country!: Country;

    @ManyToOne(() => Representative)
    @JoinColumn({name: 'representativeId'})
    representative!: Representative;

    @Column({length: 64})
    city!: string;

    @Column('decimal', {precision: 10, scale: 7})
    latitude!: number;

    @Column('decimal', {precision: 10, scale: 7})
    longitude!: number;

    @Column({length: 16})
    phoneNumber!: string;
}
