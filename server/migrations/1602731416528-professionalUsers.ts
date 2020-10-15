import {MigrationInterface, QueryRunner} from "typeorm";

export class professionalUsers1602731416528 implements MigrationInterface {
    name = 'professionalUsers1602731416528'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "companies" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "location" character varying(256) NOT NULL, "industry" character varying(100) NOT NULL, "description" text NOT NULL DEFAULT '', CONSTRAINT "PK_d4bc3e82a314fa9e29f652c2c22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "professional_users_role_enum" AS ENUM('None', 'Accounting', 'Administrative', 'Arts and Design', 'Business Development', 'Community & Social Services', 'Consulting', 'Education', 'Engineering', 'Entrepreneurship', 'Finance', 'Healthcare Services', 'Human Resources', 'Information Technology', 'Legal', 'Marketing', 'Media & Communications', 'Military & Protective Services', 'Operations', 'Product Management', 'Program & Product Management', 'Purchasing', 'Quality Assurance', 'Real Estate', 'Research', 'Sales', 'Support')`);
        await queryRunner.query(`CREATE TABLE "professional_users" ("user_id" integer NOT NULL, "company_id" character varying NOT NULL, "role" "professional_users_role_enum" NOT NULL DEFAULT 'None', "userIdId" integer, "companyIdId" integer, CONSTRAINT "UQ_abbfb8adeb52494eb84b3d848e2" UNIQUE ("user_id"), CONSTRAINT "REL_24206e982af7b250c922dffa85" UNIQUE ("userIdId"), CONSTRAINT "PK_b7f22b96e595c7da7490a3665c8" PRIMARY KEY ("user_id", "company_id"))`);
        await queryRunner.query(`ALTER TABLE "professional_users" ADD CONSTRAINT "FK_24206e982af7b250c922dffa85c" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "professional_users" ADD CONSTRAINT "FK_cb1b547cb7319c95118dad0f439" FOREIGN KEY ("companyIdId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "professional_users" DROP CONSTRAINT "FK_cb1b547cb7319c95118dad0f439"`);
        await queryRunner.query(`ALTER TABLE "professional_users" DROP CONSTRAINT "FK_24206e982af7b250c922dffa85c"`);
        await queryRunner.query(`DROP TABLE "professional_users"`);
        await queryRunner.query(`DROP TYPE "professional_users_role_enum"`);
        await queryRunner.query(`DROP TABLE "companies"`);
    }

}
