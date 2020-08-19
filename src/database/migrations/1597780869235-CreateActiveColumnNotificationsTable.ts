import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';
import { query } from 'express';

export default class CreateActiveColumnNotificationsTable1597780869235
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'notifications',
      new TableColumn({
        name: 'active',
        type: 'boolean',
        default: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('notifications', 'active');
  }
}
