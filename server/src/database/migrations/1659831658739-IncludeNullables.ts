import {MigrationInterface, QueryRunner} from "typeorm";

export class IncludeNullables1659831658739 implements MigrationInterface {
    name = 'IncludeNullables1659831658739'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "treasurybond" ALTER COLUMN "lastDateOfNegotiation" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "treasurybond" ALTER COLUMN "texts" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "treasurybond" ALTER COLUMN "texts" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "treasurybond" ALTER COLUMN "lastDateOfNegotiation" SET NOT NULL`);
    }

}
