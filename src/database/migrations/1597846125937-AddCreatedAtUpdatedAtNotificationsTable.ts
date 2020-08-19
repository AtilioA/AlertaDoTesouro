import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddCreatedAtUpdatedAtNotificationsTable1597846125937
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('notifications', [
      new TableColumn({
        name: 'created_at',
        type: 'timestamp',
        default: 'now()',
      }),
      new TableColumn({
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('notifications', [
      new TableColumn({
        name: 'created_at',
        type: 'timestamp',
      }),
      new TableColumn({
        name: 'updated_at',
        type: 'timestamp',
      }),
    ]);
  }
}
