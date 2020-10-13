import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, Unique } from 'typeorm';
import School from './Schools';
import Users from './Users';

@Entity()
@Unique(['user_id'])
export default class TeacherUsers {
  @OneToOne(() => Users, (user) => user.id)
  @JoinColumn()
  @PrimaryColumn()
  user_id!: number;

  @ManyToOne(() => School, (school) => school.id)
  @JoinColumn()
  @PrimaryColumn()
  school_id!: string;
}
