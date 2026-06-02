import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  phone: text('phone'),
  password: text('password').notNull(),
  isZeloPrime: integer('is_zelo_prime', { mode: 'boolean' }).default(false),
});

export const professionals = sqliteTable('professionals', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  category: text('category').notNull(),
  rating: text('rating').default('5.0'),
  phone: text('phone').notNull(),
  isPrime: integer('is_prime', { mode: 'boolean' }).default(false),
});