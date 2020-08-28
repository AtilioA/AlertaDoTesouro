import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddConfirmedColumnUsersTable1598633774096
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'confirmed',
        type: 'bool',
        default: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(
      'users',
      new TableColumn({
        name: 'confirmed',
        type: 'bool',
        default: false,
      }),
    );
  }
}
