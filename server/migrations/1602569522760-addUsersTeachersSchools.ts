import {MigrationInterface, QueryRunner} from "typeorm";

export class addUsersTeachersSchools1602569522760 implements MigrationInterface {
    name = 'addUsersTeachersSchools1602569522760'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "schools" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "location" character varying(256) NOT NULL, "description" text NOT NULL DEFAULT '', CONSTRAINT "PK_95b932e47ac129dd8e23a0db548" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "password" character varying NOT NULL, "email" character varying(512) NOT NULL, "bio" text NOT NULL DEFAULT '', CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "teacher_users" ("user_id" integer NOT NULL, "school_id" character varying NOT NULL, "userIdId" integer, "schoolIdId" integer, CONSTRAINT "UQ_f7683e6e77e84bb023f24d29281" UNIQUE ("user_id"), CONSTRAINT "REL_9cabc229673cc3dddd31de1447" UNIQUE ("userIdId"), CONSTRAINT "PK_2c705df3cbf47b5d1e6cb78fe53" PRIMARY KEY ("user_id", "school_id"))`);
        await queryRunner.query(`ALTER TABLE "teacher_users" ADD CONSTRAINT "FK_9cabc229673cc3dddd31de1447a" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "teacher_users" ADD CONSTRAINT "FK_e8f751d7e386a81dd474efcad86" FOREIGN KEY ("schoolIdId") REFERENCES "schools"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teacher_users" DROP CONSTRAINT "FK_e8f751d7e386a81dd474efcad86"`);
        await queryRunner.query(`ALTER TABLE "teacher_users" DROP CONSTRAINT "FK_9cabc229673cc3dddd31de1447a"`);
        await queryRunner.query(`DROP TABLE "teacher_users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "schools"`);
    }

}
