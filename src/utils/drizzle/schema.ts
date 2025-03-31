import { relations } from "drizzle-orm";
import { pgEnum, pgTable, primaryKey, serial, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const userRolesEnum = pgEnum("user_roles", ["user", "admin"]);

export const usersTable = pgTable("users_table", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text().notNull(),
  email: text().notNull().unique(),
  password: text(),
  salt: text(),
  role: userRolesEnum().notNull().default("user"),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
});

export const oAuthProviders = ["discord", "github"] as const;
export type OAuthProvider = (typeof oAuthProviders)[number];
export const oAuthProviderEnum = pgEnum("oauth_provides", ["discord", "github"]);

export const userOAuthAccountTable = pgTable(
  "user_oauth_accounts",
  {
    userId: uuid()
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    provider: oAuthProviderEnum().notNull(),
    providerAccountId: text().notNull().unique(),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp({ withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (t) => [primaryKey({ columns: [t.providerAccountId, t.provider] })]
);

export const userOauthAccountRelationships = relations(userOAuthAccountTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [userOAuthAccountTable.userId],
    references: [usersTable.id],
  }),
}));

export const postsTable = pgTable("posts_table", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertPost = typeof postsTable.$inferInsert;
export type SelectPost = typeof postsTable.$inferSelect;
