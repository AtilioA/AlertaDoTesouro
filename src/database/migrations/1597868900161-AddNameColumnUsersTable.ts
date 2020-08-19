import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';
import { query } from 'express';

export default class CreateNameColumnUsersTable1597780869235
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'name',
        type: 'text',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'name');
  }
}
