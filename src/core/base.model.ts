import {BaseEntity, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

export abstract class BaseModel extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @CreateDateColumn()
    createdAt!: string;

    @UpdateDateColumn({ nullable: true})
    updatedAt!: string;
}