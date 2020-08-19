import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateTreasuryBonds1597711023289
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'treasurybonds',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'code',
            type: 'int',
          },
          {
            name: 'name',
            type: 'text',
          },
          {
            name: 'expirationDate',
            type: 'Date',
          },
          {
            name: 'minimumInvestmentAmount',
            type: 'float',
          },
          {
            name: 'investmentUnitaryValue',
            type: 'float',
          },
          {
            name: 'semianualInterestIndex',
            type: 'boolean',
          },
          {
            name: 'annualInvestmentRate',
            type: 'float',
          },
          {
            name: 'annualRedRate',
            type: 'float',
          },
          {
            name: 'minimumRedValue',
            type: 'float',
          },
          {
            name: 'ISIN',
            type: 'text',
          },
          {
            name: 'indexedTo',
            type: 'json',
          },
          {
            name: 'treasuryBondTexts',
            type: 'json',
          },
          {
            name: 'lastDateOfNegotiation',
            type: 'Date',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('treasurybonds');
  }
}
