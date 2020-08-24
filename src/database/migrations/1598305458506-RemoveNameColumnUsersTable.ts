import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class RemoveNameColumnUsersTable1598305458506
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'name');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'name',
        type: 'text',
      }),
    );
  }
}
