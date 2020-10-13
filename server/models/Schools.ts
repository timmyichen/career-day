import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Schools {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100, nullable: false })
  name!: string;

  @Column({ length: 256, nullable: false })
  location!: string;

  @Column({ type: 'text', default: '' })
  description?: string;
}
