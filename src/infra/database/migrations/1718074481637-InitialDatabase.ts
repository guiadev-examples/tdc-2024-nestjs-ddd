import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialDatabase1718074481637 implements MigrationInterface {
    name = 'InitialDatabase1718074481637'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "suppliers" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "public_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "UQ_ea62ac3ab1f9fb4265c6a79cdc7" UNIQUE ("public_id"), CONSTRAINT "PK_b70ac51766a9e3144f778cfe81e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "public_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "UQ_2508c6862cd49a41826f77e23e2" UNIQUE ("public_id"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "manufacturers" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "public_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "UQ_c5644a6366946934e317a0ee9e2" UNIQUE ("public_id"), CONSTRAINT "PK_138520de32c379a48e703441975" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "public_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "stock_quantity" integer NOT NULL, "price" integer NOT NULL, "category_id" integer, "manufacturer_id" integer, "supplier_id" integer, CONSTRAINT "UQ_a9fdc2cfb127916506c619a9a48" UNIQUE ("public_id"), CONSTRAINT "REL_9a5f6868c96e0069e699f33e12" UNIQUE ("category_id"), CONSTRAINT "REL_5bc36ce05cc397317480efb18f" UNIQUE ("manufacturer_id"), CONSTRAINT "REL_0ec433c1e1d444962d592d86c8" UNIQUE ("supplier_id"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_items" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "sold_product" jsonb NOT NULL, "quantity" integer NOT NULL, "sold_product_id" integer, "order_id" integer, CONSTRAINT "REL_c36aff02765454ff6ff6c476ea" UNIQUE ("sold_product_id"), CONSTRAINT "PK_005269d8574e6fac0493715c308" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "addresses" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "street" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "country" character varying NOT NULL, "postal_code" character varying NOT NULL, "customer_id" integer, CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."payment_methods_payment_method_type_enum" AS ENUM('CREDIT_CARD', 'DEBIT_CARD', 'PIX')`);
        await queryRunner.query(`CREATE TABLE "payment_methods" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "payment_method_type" "public"."payment_methods_payment_method_type_enum" NOT NULL, "identification_key" character varying NOT NULL, "extra_info" jsonb, "customer_id" integer, CONSTRAINT "PK_34f9b8c6dfb4ac3559f7e2820d1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customers" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "public_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "social_identification" character varying NOT NULL, CONSTRAINT "UQ_6c08212d10bb9c266861b04bfa6" UNIQUE ("public_id"), CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "public_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "delivery_address" jsonb NOT NULL, "billing_address" jsonb NOT NULL, "purchasing_customer_id" integer, CONSTRAINT "UQ_c545f013afea21ab10d0dc7b703" UNIQUE ("public_id"), CONSTRAINT "REL_65d4d940a5c9973fff930beb33" UNIQUE ("purchasing_customer_id"), CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_9a5f6868c96e0069e699f33e124" FOREIGN KEY ("category_id") REFERENCES "manufacturers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_5bc36ce05cc397317480efb18f6" FOREIGN KEY ("manufacturer_id") REFERENCES "manufacturers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_0ec433c1e1d444962d592d86c86" FOREIGN KEY ("supplier_id") REFERENCES "suppliers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD CONSTRAINT "FK_c36aff02765454ff6ff6c476ea3" FOREIGN KEY ("sold_product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD CONSTRAINT "FK_145532db85752b29c57d2b7b1f1" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_7482082bf53fd0ba88a32e3de88" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment_methods" ADD CONSTRAINT "FK_d8d4eb6f793843b5ee65cc5dada" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_65d4d940a5c9973fff930beb335" FOREIGN KEY ("purchasing_customer_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_65d4d940a5c9973fff930beb335"`);
        await queryRunner.query(`ALTER TABLE "payment_methods" DROP CONSTRAINT "FK_d8d4eb6f793843b5ee65cc5dada"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_7482082bf53fd0ba88a32e3de88"`);
        await queryRunner.query(`ALTER TABLE "order_items" DROP CONSTRAINT "FK_145532db85752b29c57d2b7b1f1"`);
        await queryRunner.query(`ALTER TABLE "order_items" DROP CONSTRAINT "FK_c36aff02765454ff6ff6c476ea3"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_0ec433c1e1d444962d592d86c86"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_5bc36ce05cc397317480efb18f6"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_9a5f6868c96e0069e699f33e124"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "customers"`);
        await queryRunner.query(`DROP TABLE "payment_methods"`);
        await queryRunner.query(`DROP TYPE "public"."payment_methods_payment_method_type_enum"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
        await queryRunner.query(`DROP TABLE "order_items"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "manufacturers"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "suppliers"`);
    }

}
