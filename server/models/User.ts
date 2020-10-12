import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100, nullable: false })
  name!: string;

  @Column({ nullable: false })
  password!: string;

  @Column({ nullable: false, length: 512 })
  email!: string;

  @Column({ type: 'text', default: '' })
  bio?: string;
}
