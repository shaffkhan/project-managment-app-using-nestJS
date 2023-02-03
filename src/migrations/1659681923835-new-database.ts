import { MigrationInterface, QueryRunner } from "typeorm";

export class newDatabase1659681923835 implements MigrationInterface {
    name = 'newDatabase1659681923835'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "client" (
                "id" SERIAL NOT NULL,
                "isActive" boolean NOT NULL DEFAULT true,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "name" character varying NOT NULL,
                "responsibilities" character varying NOT NULL,
                CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "team" (
                "id" SERIAL NOT NULL,
                "isActive" boolean NOT NULL DEFAULT true,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "name" character varying NOT NULL,
                CONSTRAINT "PK_f57d8293406df4af348402e4b74" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "projectDocument" (
                "id" SERIAL NOT NULL,
                "isActive" boolean NOT NULL DEFAULT true,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "name" character varying NOT NULL,
                "version" integer NOT NULL,
                "author" character varying NOT NULL,
                "type" character varying NOT NULL,
                "projectId" integer,
                CONSTRAINT "PK_059b8f102639861bb0542000970" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "project_category" (
                "id" SERIAL NOT NULL,
                "isActive" boolean NOT NULL DEFAULT true,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "name" character varying NOT NULL,
                CONSTRAINT "PK_826c5e0f45e35b5983c8379be7b" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "project" (
                "id" SERIAL NOT NULL,
                "isActive" boolean NOT NULL DEFAULT true,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "title" character varying NOT NULL,
                "duration" character varying NOT NULL,
                "budget" character varying NOT NULL,
                "category" character varying NOT NULL,
                "proposal" character varying NOT NULL,
                "feasibility" character varying NOT NULL,
                "isInHouse" boolean NOT NULL,
                "status" boolean NOT NULL,
                "clientId" integer,
                "projectCategoryId" integer,
                CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "task" (
                "id" SERIAL NOT NULL,
                "isActive" boolean NOT NULL DEFAULT true,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "title" character varying NOT NULL,
                "description" character varying NOT NULL,
                "asignee" character varying NOT NULL,
                "reporter" character varying NOT NULL,
                "priorty" integer NOT NULL,
                "estimatedDuration" integer NOT NULL,
                "status" boolean NOT NULL,
                "projectId" integer,
                "profileId" integer,
                CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "profile" (
                "id" SERIAL NOT NULL,
                "isActive" boolean NOT NULL DEFAULT true,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "avatar" character varying NOT NULL,
                "address" character varying NOT NULL,
                "jobType" character varying NOT NULL,
                "isRemote" boolean NOT NULL,
                "totalHours" integer NOT NULL,
                "salaryPerHour" integer NOT NULL,
                "userId" integer,
                "designationId" integer,
                "teamId" integer,
                CONSTRAINT "REL_a24972ebd73b106250713dcddd" UNIQUE ("userId"),
                CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."user_role_enum" AS ENUM('admin', 'staff', 'client', 'profile')
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "isActive" boolean NOT NULL DEFAULT true,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "name" character varying NOT NULL,
                "email" character varying NOT NULL,
                "password" character varying NOT NULL,
                "role" "public"."user_role_enum" NOT NULL DEFAULT 'staff',
                "profileId" integer,
                "clientId" integer,
                CONSTRAINT "REL_9466682df91534dd95e4dbaa61" UNIQUE ("profileId"),
                CONSTRAINT "REL_56f28841fe433cf13f8685f9bc" UNIQUE ("clientId"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "client" DROP COLUMN "name"
        `);
        await queryRunner.query(`
            ALTER TABLE "client" DROP COLUMN "responsibilities"
        `);
        await queryRunner.query(`
            ALTER TABLE "client"
            ADD "name" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "client"
            ADD "responsibilities" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "client"
            ADD "contactPerson" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "client"
            ADD "contactNumber" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "client"
            ADD "contactEmail" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "client"
            ADD "address" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "projectDocument"
            ADD CONSTRAINT "FK_3453a51e933836c1029e712c79b" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "project"
            ADD CONSTRAINT "FK_816f608a9acf4a4314c9e1e9c66" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "project"
            ADD CONSTRAINT "FK_63e100d6d811196f2240c262458" FOREIGN KEY ("projectCategoryId") REFERENCES "project_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "task"
            ADD CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "task"
            ADD CONSTRAINT "FK_7220f8489e005808ed7d8740bb6" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "profile"
            ADD CONSTRAINT "FK_a24972ebd73b106250713dcddd9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "profile"
            ADD CONSTRAINT "FK_5d81e4d33e6d4b404a537e9dd97" FOREIGN KEY ("designationId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "profile"
            ADD CONSTRAINT "FK_6f85d7f0e0f309a4ce2fc194bb9" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "FK_9466682df91534dd95e4dbaa616" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "FK_56f28841fe433cf13f8685f9bc1" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "FK_56f28841fe433cf13f8685f9bc1"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "FK_9466682df91534dd95e4dbaa616"
        `);
        await queryRunner.query(`
            ALTER TABLE "profile" DROP CONSTRAINT "FK_6f85d7f0e0f309a4ce2fc194bb9"
        `);
        await queryRunner.query(`
            ALTER TABLE "profile" DROP CONSTRAINT "FK_5d81e4d33e6d4b404a537e9dd97"
        `);
        await queryRunner.query(`
            ALTER TABLE "profile" DROP CONSTRAINT "FK_a24972ebd73b106250713dcddd9"
        `);
        await queryRunner.query(`
            ALTER TABLE "task" DROP CONSTRAINT "FK_7220f8489e005808ed7d8740bb6"
        `);
        await queryRunner.query(`
            ALTER TABLE "task" DROP CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe"
        `);
        await queryRunner.query(`
            ALTER TABLE "project" DROP CONSTRAINT "FK_63e100d6d811196f2240c262458"
        `);
        await queryRunner.query(`
            ALTER TABLE "project" DROP CONSTRAINT "FK_816f608a9acf4a4314c9e1e9c66"
        `);
        await queryRunner.query(`
            ALTER TABLE "projectDocument" DROP CONSTRAINT "FK_3453a51e933836c1029e712c79b"
        `);
        await queryRunner.query(`
            ALTER TABLE "client" DROP COLUMN "address"
        `);
        await queryRunner.query(`
            ALTER TABLE "client" DROP COLUMN "contactEmail"
        `);
        await queryRunner.query(`
            ALTER TABLE "client" DROP COLUMN "contactNumber"
        `);
        await queryRunner.query(`
            ALTER TABLE "client" DROP COLUMN "contactPerson"
        `);
        await queryRunner.query(`
            ALTER TABLE "client" DROP COLUMN "responsibilities"
        `);
        await queryRunner.query(`
            ALTER TABLE "client" DROP COLUMN "name"
        `);
        await queryRunner.query(`
            ALTER TABLE "client"
            ADD "responsibilities" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "client"
            ADD "name" character varying NOT NULL
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."user_role_enum"
        `);
        await queryRunner.query(`
            DROP TABLE "profile"
        `);
        await queryRunner.query(`
            DROP TABLE "task"
        `);
        await queryRunner.query(`
            DROP TABLE "project"
        `);
        await queryRunner.query(`
            DROP TABLE "project_category"
        `);
        await queryRunner.query(`
            DROP TABLE "projectDocument"
        `);
        await queryRunner.query(`
            DROP TABLE "team"
        `);
        await queryRunner.query(`
            DROP TABLE "client"
        `);
    }

}
