import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export default class Users extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ length: 100, nullable: false })
  name!: string;

  @Column({ nullable: false })
  password!: string;

  @Field()
  @Column({ nullable: false, length: 512 })
  email!: string;

  @Field()
  @Column({ type: 'text', default: '' })
  bio?: string;
}
