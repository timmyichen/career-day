import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Industries from './Industries';

@Entity()
export default class Companies extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100, nullable: false })
  name!: string;

  @Column({ length: 256, nullable: false })
  location!: string;

  @ManyToOne(() => Industries, (industry) => industry.id)
  @JoinColumn()
  industry_id!: string;

  @Column({ type: 'text', default: '' })
  description?: string;
}
