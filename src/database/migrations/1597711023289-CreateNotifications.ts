import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateNotifications1597711023289
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'notifications',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'value',
            type: 'float',
          },
          {
            name: 'type',
            type: 'varchar',
          },
          {
            name: 'notifyByEmail',
            type: 'bool',
            default: true,
          },
          {
            name: 'notifyByBrowser',
            type: 'bool',
            default: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('notifications');
  }
}
