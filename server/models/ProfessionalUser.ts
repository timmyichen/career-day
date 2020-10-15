import { BaseEntity, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, Unique } from 'typeorm';
import Companies from './Companies';
import Users from './Users';
import Roles from './Roles';

@Entity()
@Unique(['user_id'])
export default class ProfessionalUsers extends BaseEntity {
  @OneToOne(() => Users, (user) => user.id)
  @JoinColumn()
  @PrimaryColumn()
  user_id!: number;

  @ManyToOne(() => Companies, (company) => company.id)
  @JoinColumn()
  @PrimaryColumn()
  company_id!: string;

  @ManyToOne(() => Roles, (role) => role.id)
  @JoinColumn()
  roles_id!: string;
}
