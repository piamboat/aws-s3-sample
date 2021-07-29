import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class ImageEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ default: 'noimage.jpeg' })
    image: string

    @Column()
    desc: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}