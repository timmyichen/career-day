import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Companies extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100, nullable: false })
  name!: string;

  @Column({ length: 256, nullable: false })
  location!: string;

  @Column({ length: 100, nullable: false})
  industry!: string;
  
  @Column({ type: 'text', default: '' })
  description?: string;
}