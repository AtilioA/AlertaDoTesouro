import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddTextIndexedToColumnsTreasuryBondsTable1598196637832
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('treasurybonds', [
      new TableColumn({
        name: 'texts',
        type: 'json',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('treasurybonds', [
      new TableColumn({
        name: 'texts',
        type: 'json',
      }),
    ]);
  }
}
