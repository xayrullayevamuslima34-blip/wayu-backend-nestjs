import {
    Column,
    Entity,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import {BaseModel} from "../../../core/base.model";
import { Country } from "../../common/countries/countries.entity";
import {Representative} from "../representatives/representatives.entity";
import type {Relation} from 'typeorm';

@Entity('branches')
export class Branch extends BaseModel {
    @Column()
    countryId!: number;

    @Column()
    representativeId!: number;

    @ManyToOne(() => Country, (country) => country.branch)
    @JoinColumn({name: 'countryId'})
    country!: Relation<Country>;

    @ManyToOne(() => Representative, (representative) => representative.branch)
    @JoinColumn({name: 'representativeId'})
    representative!: Relation<Representative>;

    @Column({length: 64})
    city!: string;

    @Column('decimal', {precision: 10, scale: 7})
    latitude!: number;

    @Column('decimal', {precision: 10, scale: 7})
    longitude!: number;

    @Column({length: 16})
    phoneNumber!: string;
}
