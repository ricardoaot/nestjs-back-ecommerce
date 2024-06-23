import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial21719154017201 implements MigrationInterface {
    name = 'Initial21719154017201'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying(60) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "date" SET DEFAULT '"2024-06-23T14:47:02.805Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "date" SET DEFAULT '2024-06-23'`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying(40) NOT NULL`);
    }

}
