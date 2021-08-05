import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class DirectImageEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ default: 'noimage.jpeg' })
    image: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}