import {MigrationInterface, QueryRunner} from "typeorm";

export class addRelationshipBetweenProfessionalsAndRequests1603330185501 implements MigrationInterface {
    name = 'addRelationshipBetweenProfessionalsAndRequests1603330185501'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "requests_followers_professional_users" ("requestsId" integer NOT NULL, "requestsRequesterId" integer NOT NULL, "professionalUsersUserId" integer NOT NULL, "professionalUsersCompanyId" character varying NOT NULL, CONSTRAINT "PK_2c72382f694d99080387ea9080c" PRIMARY KEY ("requestsId", "requestsRequesterId", "professionalUsersUserId", "professionalUsersCompanyId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8fceef3e277c69f4e9b9125313" ON "requests_followers_professional_users" ("requestsId", "requestsRequesterId") `);
        await queryRunner.query(`CREATE INDEX "IDX_80935126a3441dabc6d347c753" ON "requests_followers_professional_users" ("professionalUsersUserId", "professionalUsersCompanyId") `);
        await queryRunner.query(`ALTER TABLE "requests_followers_professional_users" ADD CONSTRAINT "FK_8fceef3e277c69f4e9b9125313f" FOREIGN KEY ("requestsId", "requestsRequesterId") REFERENCES "requests"("id","requester_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "requests_followers_professional_users" ADD CONSTRAINT "FK_80935126a3441dabc6d347c7537" FOREIGN KEY ("professionalUsersUserId", "professionalUsersCompanyId") REFERENCES "professional_users"("user_id","company_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "requests_followers_professional_users" DROP CONSTRAINT "FK_80935126a3441dabc6d347c7537"`);
        await queryRunner.query(`ALTER TABLE "requests_followers_professional_users" DROP CONSTRAINT "FK_8fceef3e277c69f4e9b9125313f"`);
        await queryRunner.query(`DROP INDEX "IDX_80935126a3441dabc6d347c753"`);
        await queryRunner.query(`DROP INDEX "IDX_8fceef3e277c69f4e9b9125313"`);
        await queryRunner.query(`DROP TABLE "requests_followers_professional_users"`);
    }

}
