import {Column, Entity, ManyToOne, JoinColumn} from 'typeorm';
import {BaseModel} from "@/core/base.model";
import {Vacancy} from "../vacancies/vacancies.entity";
import {ApplicationStatus} from "@/core/enums/aplicationStatus.enum";


@Entity('applications')
export class Application extends BaseModel {
    @Column({length: 64})
    fullName!: string;

    @Column({length: 16})
    phoneNumber!: string;

    @Column({length: 64})
    email!: string;

    @Column()
    vacancyId!: number;

    @ManyToOne(() => Vacancy)
    @JoinColumn({name: 'vacancyId'})
    vacancy!: number;

    @Column({length: 128})
    resume!: string;

    @Column({type: 'enum', enum: ApplicationStatus, default: ApplicationStatus.active})
    status!: ApplicationStatus;
}
