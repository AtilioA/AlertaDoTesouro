import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddTreasurybondIdTableNotifications1597847598548
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'notifications',
      new TableColumn({
        name: 'treasurybond_id',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'notifications',
      new TableForeignKey({
        name: 'NotificationTreasuryBond',
        columnNames: ['treasurybond_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'treasurybonds',
        onDelete: 'SET NULL', // Keep all notifications if treasury bond is deleted
        onUpdate: 'CASCADE', // Update all notifications if treasury bond id is updated
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'notifications',
      'NotificationTreasuryBond',
    );

    await queryRunner.dropColumn('notifications', 'treasurybond_id');
  }
}
