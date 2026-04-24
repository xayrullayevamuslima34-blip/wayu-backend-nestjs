import {BaseEntity, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class BaseModel extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @CreateDateColumn({type: "timestamp"})
    createdAt!: string;

    @UpdateDateColumn({type: "timestamp", nullable: true})
    updatedAt!: string;
}