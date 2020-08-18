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
          // {
          //   name: 'bond',
          //   type: 'json',
          //   isNullable: false,
          // },
          {
            name: 'value',
            type: 'float',
            isNullable: false,
          },
          {
            name: 'type',
            type: 'int',
            isNullable: false,
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
