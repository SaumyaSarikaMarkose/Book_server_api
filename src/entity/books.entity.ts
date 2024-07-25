import { Entity, Column, PrimaryGeneratedColumn,Repository } from "typeorm"

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    price: string;

    @Column()
    author: string;

    @Column()
    language: string;

    @Column({ default: () => "CURRENT_TIMESTAMP" }) 
    publishedYear: Date;

    @Column()
    coverImage: string;
}
