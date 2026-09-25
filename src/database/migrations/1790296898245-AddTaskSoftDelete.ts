import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTaskSoftDelete1790296898245 implements MigrationInterface {
    name = 'AddTaskSoftDelete1790296898245'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" ADD "deleted_at" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "deleted_at"`);
    }

}
