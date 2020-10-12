import {MigrationInterface, QueryRunner} from "typeorm";

export class addUserTable1602459812316 implements MigrationInterface {
    name = 'addUserTable1602459812316'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "password" character varying NOT NULL, "email" character varying(512) NOT NULL, "bio" text NOT NULL DEFAULT '', CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
