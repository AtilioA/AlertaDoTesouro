import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeNotificationsTypeType1597764096762
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "notifications"
ALTER COLUMN type TYPE VARCHAR
USING type::VARCHAR`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
