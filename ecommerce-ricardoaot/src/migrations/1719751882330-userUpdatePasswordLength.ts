import { MigrationInterface, QueryRunner } from "typeorm";

export class UserUpdatePasswordLength1719751882330 implements MigrationInterface {
    name = 'User.updatePasswordLength1719751882330'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "date" SET DEFAULT '"2024-06-30T12:51:26.441Z"'`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying(100) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying(40) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "date" SET DEFAULT '2024-06-30'`);
    }

}
