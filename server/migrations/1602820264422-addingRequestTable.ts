import {MigrationInterface, QueryRunner} from "typeorm";

export class addingRequestTable1602820264422 implements MigrationInterface {
    name = 'addingRequestTable1602820264422'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "requests_status_enum" AS ENUM('open', 'matched', 'booked', 'completed', 'postponed', 'absent', 'closed')`);
        await queryRunner.query(`CREATE TABLE "requests" ("id" SERIAL NOT NULL, "requester_id" integer NOT NULL, "name" character varying(100) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "description" character varying(255) NOT NULL, "event_date" TIMESTAMP WITH TIME ZONE NOT NULL, "status" "requests_status_enum" NOT NULL DEFAULT 'open', "requesterIdId" integer, "industryIdId" integer, "roleIdId" integer, CONSTRAINT "PK_3c5110e06624f023d0628b19b7d" PRIMARY KEY ("id", "requester_id"))`);
        await queryRunner.query(`ALTER TABLE "requests" ADD CONSTRAINT "FK_e419f8e3a672894fc59e09b727f" FOREIGN KEY ("requesterIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "requests" ADD CONSTRAINT "FK_2ae7833fca1f2fb808a6870bbcb" FOREIGN KEY ("industryIdId") REFERENCES "industries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "requests" ADD CONSTRAINT "FK_e6e42dd98945034d20d5b5c2eed" FOREIGN KEY ("roleIdId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "requests" DROP CONSTRAINT "FK_e6e42dd98945034d20d5b5c2eed"`);
        await queryRunner.query(`ALTER TABLE "requests" DROP CONSTRAINT "FK_2ae7833fca1f2fb808a6870bbcb"`);
        await queryRunner.query(`ALTER TABLE "requests" DROP CONSTRAINT "FK_e419f8e3a672894fc59e09b727f"`);
        await queryRunner.query(`DROP TABLE "requests"`);
        await queryRunner.query(`DROP TYPE "requests_status_enum"`);
    }

}
