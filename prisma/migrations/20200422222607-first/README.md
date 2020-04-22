# Migration `20200422222607-first`

This migration has been generated at 4/22/2020, 10:26:07 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "quaint"."Movie" (
    "director" TEXT NOT NULL  ,
    "id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,
    "movieName" TEXT NOT NULL  ,
    "yearReleased" INTEGER NOT NULL  
) 
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200422222607-first
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,15 @@
+generator client {
+  provider = "prisma-client-js"
+}
+
+datasource db {
+  provider = "sqlite"
+  url      = env("DATABASE_URL")
+}
+
+model Movie {
+  id           Int    @default(autoincrement()) @id
+  director     String
+  movieName    String
+  yearReleased Int
+}
```


