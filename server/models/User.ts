import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class User {
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
