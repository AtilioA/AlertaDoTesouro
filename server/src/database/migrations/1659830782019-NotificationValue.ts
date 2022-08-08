import { MigrationInterface, QueryRunner } from 'typeorm';

export class NotificationValue1659830782019 implements MigrationInterface {
  name = 'NotificationValue1659830782019';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "treasurybond" ALTER COLUMN "lastDateOfNegotiation" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "confirmed" SET NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "value"`);
    await queryRunner.query(
      `ALTER TABLE "notifications" ADD "value" numeric NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "value"`);
    await queryRunner.query(
      `ALTER TABLE "notifications" ADD "value" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "confirmed" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "treasurybond" ALTER COLUMN "lastDateOfNegotiation" DROP NOT NULL`,
    );
  }
}
