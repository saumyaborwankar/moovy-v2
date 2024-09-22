import {
  InferModelFromColumns,
  InferSelectModel,
  relations,
} from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
} from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  hashedPassword: text("hashedPassword"),
  googleId: text("googleId").unique(),
  isEmailVerified: boolean("is_email_verified").notNull().default(false),
  profilePictureUrl: text("profile_picture_url"),
});

export const oauthAccountTable = pgTable("oauth_account", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .references(() => userTable.id)
    .notNull(),
  provider: text("provider").notNull(),
  providerId: text("providerId"),
  accessToken: text("access_token").notNull(),
  refreshToken: text("refresh_token"),
  expiresAt: timestamp("expires_at", { withTimezone: true, mode: "date" }),
});

export const emailVerificationTable = pgTable("email_verification", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  code: text("code").notNull(),
  sentAt: timestamp("sent_at", { withTimezone: true, mode: "date" }).notNull(),
});
export const sessionTable = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const clientTable = pgTable("client", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  firstName: text("first_name").notNull(),
  lastName: text("last_name"),
  email: text("email").unique().notNull(),
  phoneNumber: text("phone_number"),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  }).default(new Date()),
  age: integer("age").notNull(),
  address: text("address"),
});
export const clientRelations = relations(clientTable, ({ many }) => ({
  notes: many(noteTable),
}));
export type Client = InferSelectModel<typeof clientTable>;

export const noteTable = pgTable("note", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  clientId: text("client_id")
    .notNull()
    .references(() => clientTable.id),
  content: text("content").notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  }).default(new Date()),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    mode: "date",
  }).default(new Date()),
});

export type Note = InferSelectModel<typeof noteTable>;
export const noteRelations = relations(noteTable, ({ one }) => ({
  client: one(clientTable, {
    fields: [noteTable.clientId],
    references: [clientTable.id],
  }),
}));
