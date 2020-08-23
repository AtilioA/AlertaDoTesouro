import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropNullColumnsTreasuryBondsTable1598206114722
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "treasurybonds"
    ALTER COLUMN "lastDateOfNegotiation" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
