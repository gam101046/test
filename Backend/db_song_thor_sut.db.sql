BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "members" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"username"	text,
	"password"	text,
	"email"	text,
	"first_name"	text,
	"last_name"	text,
	"phone_number"	text,
	"address"	text,
	"profile_pic"	text,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "sellers" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"year"	integer,
	"institute_of"	text,
	"major"	text,
	"picture_student"	text,
	"member_id"	integer,
	CONSTRAINT "uni_sellers_member_id" UNIQUE("member_id"),
	PRIMARY KEY("id" AUTOINCREMENT),
	CONSTRAINT "fk_members_sellers" FOREIGN KEY("member_id") REFERENCES "members"("id")
);
CREATE TABLE IF NOT EXISTS "products" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"title"	text,
	"description"	text,
	"price"	integer,
	"category"	text,
	"picture_product"	text,
	"condition"	text,
	"weight"	real,
	"status"	text,
	"seller_id"	integer,
	PRIMARY KEY("id" AUTOINCREMENT),
	CONSTRAINT "fk_sellers_products" FOREIGN KEY("seller_id") REFERENCES "sellers"("id")
);
CREATE TABLE IF NOT EXISTS "orders" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"quantity"	integer,
	"total_price"	real,
	"member_id"	integer,
	"seller_id"	integer,
	PRIMARY KEY("id" AUTOINCREMENT),
	CONSTRAINT "fk_orders_seller" FOREIGN KEY("seller_id") REFERENCES "sellers"("id"),
	CONSTRAINT "fk_members_orders" FOREIGN KEY("member_id") REFERENCES "members"("id")
);
CREATE TABLE IF NOT EXISTS "products_orders" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"product_id"	integer,
	"order_id"	integer,
	PRIMARY KEY("id" AUTOINCREMENT),
	CONSTRAINT "fk_orders_product_orders" FOREIGN KEY("order_id") REFERENCES "orders"("id"),
	CONSTRAINT "fk_products_product_orders" FOREIGN KEY("product_id") REFERENCES "products"("id")
);
INSERT INTO "members" VALUES (1,'2024-08-30 18:43:27.005514+07:00','2024-08-30 18:43:27.005514+07:00',NULL,'B6526221','gam101046','sa@gmail.com','Natthawut','Samruamjit','0910164350','4/4 นครพนม 48120','');
INSERT INTO "members" VALUES (2,'2024-08-30 19:01:55.099538+07:00','2024-08-30 19:01:55.099538+07:00',NULL,'B6526221','gam101046','gam101046gam@gmail.com','Natthawut','Samruamjit','0910164350','4/4 นครพนม 48120','');
CREATE INDEX IF NOT EXISTS "idx_members_deleted_at" ON "members" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_sellers_deleted_at" ON "sellers" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_products_deleted_at" ON "products" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_orders_deleted_at" ON "orders" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_products_orders_deleted_at" ON "products_orders" (
	"deleted_at"
);
COMMIT;
