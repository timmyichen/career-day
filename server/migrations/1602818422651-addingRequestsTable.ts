import {MigrationInterface, QueryRunner} from "typeorm";

export class addingRequestsTable1602818422651 implements MigrationInterface {
    name = 'addingRequestsTable1602818422651'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "industries" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, CONSTRAINT "PK_f1626dcb2d58142d7dfcca7b8d1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "companies" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "location" character varying(256) NOT NULL, "description" text NOT NULL DEFAULT '', "industryIdId" integer, CONSTRAINT "PK_d4bc3e82a314fa9e29f652c2c22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "professional_users" ("user_id" integer NOT NULL, "company_id" character varying NOT NULL, "userIdId" integer, "companyIdId" integer, "roleIdId" integer, CONSTRAINT "UQ_abbfb8adeb52494eb84b3d848e2" UNIQUE ("user_id"), CONSTRAINT "REL_24206e982af7b250c922dffa85" UNIQUE ("userIdId"), CONSTRAINT "PK_b7f22b96e595c7da7490a3665c8" PRIMARY KEY ("user_id", "company_id"))`);
        await queryRunner.query(`CREATE TYPE "requests_status_enum" AS ENUM('open', 'matched', 'booked', 'completed', 'postponed', 'absent', 'closed')`);
        await queryRunner.query(`CREATE TABLE "requests" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "name" character varying(100) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "description" character varying(255) NOT NULL, "event_date" TIMESTAMP WITH TIME ZONE NOT NULL, "status" "requests_status_enum" NOT NULL DEFAULT 'open', "userIdId" integer, "industryIdId" integer, "roleIdId" integer, CONSTRAINT "PK_b1e8bcd70c4c876df3a52eea387" PRIMARY KEY ("id", "user_id"))`);
        await queryRunner.query(`ALTER TABLE "companies" ADD CONSTRAINT "FK_c1af9898294e721283e088293f7" FOREIGN KEY ("industryIdId") REFERENCES "industries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "professional_users" ADD CONSTRAINT "FK_24206e982af7b250c922dffa85c" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "professional_users" ADD CONSTRAINT "FK_cb1b547cb7319c95118dad0f439" FOREIGN KEY ("companyIdId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "professional_users" ADD CONSTRAINT "FK_6b18c76f12d70081c660ee05f5f" FOREIGN KEY ("roleIdId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "requests" ADD CONSTRAINT "FK_208114ff8385f27a9428fe5c560" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "requests" ADD CONSTRAINT "FK_2ae7833fca1f2fb808a6870bbcb" FOREIGN KEY ("industryIdId") REFERENCES "industries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "requests" ADD CONSTRAINT "FK_e6e42dd98945034d20d5b5c2eed" FOREIGN KEY ("roleIdId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "requests" DROP CONSTRAINT "FK_e6e42dd98945034d20d5b5c2eed"`);
        await queryRunner.query(`ALTER TABLE "requests" DROP CONSTRAINT "FK_2ae7833fca1f2fb808a6870bbcb"`);
        await queryRunner.query(`ALTER TABLE "requests" DROP CONSTRAINT "FK_208114ff8385f27a9428fe5c560"`);
        await queryRunner.query(`ALTER TABLE "professional_users" DROP CONSTRAINT "FK_6b18c76f12d70081c660ee05f5f"`);
        await queryRunner.query(`ALTER TABLE "professional_users" DROP CONSTRAINT "FK_cb1b547cb7319c95118dad0f439"`);
        await queryRunner.query(`ALTER TABLE "professional_users" DROP CONSTRAINT "FK_24206e982af7b250c922dffa85c"`);
        await queryRunner.query(`ALTER TABLE "companies" DROP CONSTRAINT "FK_c1af9898294e721283e088293f7"`);
        await queryRunner.query(`DROP TABLE "requests"`);
        await queryRunner.query(`DROP TYPE "requests_status_enum"`);
        await queryRunner.query(`DROP TABLE "professional_users"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "companies"`);
        await queryRunner.query(`DROP TABLE "industries"`);
    }

}
