import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  JoinTable,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import Users from './Users';
import Roles from './Roles';
import Industries from './Industries';

export enum RequestStatus {
  OPEN = 'open', //created and accepting likes
  MATCHED = 'matched', //requester and liker match
  BOOKED = 'booked', //confirmed for a date and time
  COMPLETED = 'completed', //career day happened
  PPD = 'postponed', //date and time pushed back
  ABSENT = 'absent', //one or both parties did not show up
  CLOSED = 'closed', //requested closed with no matches
}

@ObjectType()
@Entity()
export default class Requests extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @ManyToOne(() => Users, (user) => user.id)
  @JoinColumn()
  @PrimaryColumn()
  requester_id!: number;

  @Field()
  @Column({ length: 100, nullable: false })
  name!: string;

  @Field()
  @CreateDateColumn({ type: 'timestamp with time zone', nullable: false })
  created_at!: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp with time zone', nullable: false })
  updated_at!: Date;

  @Field()
  @Column({ length: 255, nullable: false })
  description!: string;

  @Field()
  @Column({ type: 'timestamp with time zone', nullable: false })
  event_date!: Date;

  @Field()
  @ManyToOne(() => Industries, (industry) => industry.id)
  @JoinColumn()
  industry_id!: number;

  @Field()
  @ManyToOne(() => Roles, (role) => role.id)
  @JoinColumn()
  role_id!: number;

  @Field()
  @Column({
    type: 'enum',
    enum: RequestStatus,
    default: RequestStatus.OPEN,
  })
  status!: RequestStatus;
}
