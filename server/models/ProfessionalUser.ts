import { BaseEntity, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, Unique } from 'typeorm';
import Companies from './Companies';
import Users from './Users';

export enum ProfessionalRole {
    NONE = "None",
    ACCT = "Accounting",
    ADMIN = "Administrative",
    DESIGN = "Arts and Design",
    BIZDEV = "Business Development",
    CSS = "Community & Social Services",
    CONSULT = "Consulting",
    EDU = "Education",
    ENG = "Engineering",
    ENTRE = "Entrepreneurship",
    FIN = "Finance",
    HEALTH = "Healthcare Services",
    HR = "Human Resources",
    IT = "Information Technology",
    LEGAL = "Legal",
    MKTG = "Marketing",
    COMMS = "Media & Communications",
    MPS = "Military & Protective Services",
    OPS = "Operations",
    PM = "Product Management",
    PRODUCT = "Program & Product Management",
    PURCHASE = "Purchasing",
    QA = "Quality Assurance",
    RE = "Real Estate",
    RESEARCH = "Research",
    SALES = "Sales",
    SUPPORT = "Support"
}

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

  @Column({
    type: enum, 
    nullable: false,
    enum: ProfessionalRole,
    default: ProfessionalRole.None
  })
  role!: ProfessionalRole

}