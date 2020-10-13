import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


export enum Race {
    WHITE = "white",
    BLACK = "black",
    ASIAN = "asian",
    LATINX = "latinx",
    INDIGENOUS = "indigenous",
    DECLINE = "decline",
    GHOST ="ghost"
}

export enum Education {
    ASSOCIATES = "associates",
    BACHELORS = "bachelors",
    MASTERS = "masters",
    PHD = "doctorate",
    CERT = "industry certification",
    GHOST = "ghost"
}


@Entity()
export class Professional extends User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100, nullable: false })
  name!: string;

  @Column({ nullable: false })
  password!: string;

  @Column({ nullable: false, length: 512 })
  email!: string;

  @Column({
    type: 'enum', 
    enum: Race,
    default: Race.GHOST 
  })
  role!: Race

  @Column({
    type: 'enum',
    enum: Education,
    default: Education.GHOST
  })
  role!: Education
}
