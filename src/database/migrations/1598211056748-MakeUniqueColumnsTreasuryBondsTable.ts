import { MigrationInterface, QueryRunner } from 'typeorm';

export class MakeUniqueColumnsTreasuryBondsTable1598211056748
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "treasurybonds" ADD UNIQUE(code)`);
    await queryRunner.query(`ALTER TABLE "treasurybonds" ADD UNIQUE(name)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(`ALTER TABLE "treasurybonds" DROP INDEX treasurybonds_code_key`);
    // await queryRunner.query(`ALTER TABLE "treasurybonds" DROP UNIQUE(code)`);
  }
}
