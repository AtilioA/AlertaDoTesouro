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
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "confirmed" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "notify" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "notifyByEmail" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "notifyByEmail" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "notifyByBrowser" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "notifyByBrowser" DROP DEFAULT`,
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
      `ALTER TABLE "users" ALTER COLUMN "notifyByBrowser" SET DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "notifyByBrowser" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "notifyByEmail" SET DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "notifyByEmail" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "notify" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "confirmed" SET DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "confirmed" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "treasurybond" ALTER COLUMN "lastDateOfNegotiation" DROP NOT NULL`,
    );
  }
}
