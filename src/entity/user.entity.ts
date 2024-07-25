import { Entity, Column, PrimaryGeneratedColumn,Repository } from "typeorm"

/**
 * Represents a user entity.
 *
 * @class User
 */
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    email: string;

    @Column({ default: false })
    isActive: boolean;
    
    @Column()
    password: string;

  
}