import {MigrationInterface, QueryRunner} from "typeorm";

export class MigrationsRefactoring1632517914173 implements MigrationInterface {
    name = 'MigrationsRefactoring1632517914173'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "treasurybonds" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" integer NOT NULL, "name" text NOT NULL, "expirationDate" TIMESTAMP WITH TIME ZONE NOT NULL, "minimumInvestmentAmount" double precision NOT NULL, "investmentUnitaryValue" double precision NOT NULL, "semianualInterestIndex" boolean NOT NULL, "annualInvestmentRate" double precision NOT NULL, "annualRedRate" double precision NOT NULL, "minimumRedValue" double precision NOT NULL, "ISIN" text NOT NULL, "indexedTo" json NOT NULL, "lastDateOfNegotiation" TIMESTAMP WITH TIME ZONE, "texts" json NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_08c337a5d83f7f0b0c0d884021d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" text NOT NULL, "password" text NOT NULL, "confirmed" boolean NOT NULL, "notify" boolean NOT NULL, "notifyByEmail" boolean NOT NULL, "notifyByBrowser" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "notifications_type_enum" AS ENUM('maior', 'menor')`);
        await queryRunner.query(`CREATE TABLE "notifications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "treasurybond_id" uuid NOT NULL, "value" integer NOT NULL, "type" "notifications_type_enum" NOT NULL, "notifyByEmail" boolean NOT NULL, "notifyByBrowser" boolean NOT NULL, "active" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_9a8a82462cab47c73d25f49261f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_a69633c09b0ec2abcdde4ca1d59" FOREIGN KEY ("treasurybond_id") REFERENCES "treasurybonds"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_a69633c09b0ec2abcdde4ca1d59"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_9a8a82462cab47c73d25f49261f"`);
        await queryRunner.query(`DROP TABLE "notifications"`);
        await queryRunner.query(`DROP TYPE "notifications_type_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "treasurybonds"`);
    }

}
