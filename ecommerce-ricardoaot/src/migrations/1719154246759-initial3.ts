import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial31719154246759 implements MigrationInterface {
    name = 'Initial31719154246759'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "createdAt" date NOT NULL DEFAULT '"2024-06-23T14:50:53.199Z"'`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "date" SET DEFAULT '"2024-06-23T14:50:53.198Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "date" SET DEFAULT '2024-06-23'`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdAt"`);
    }

}
