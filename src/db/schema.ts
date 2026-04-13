import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';


export const uf = sqliteTable('uf', {
  id: text('id').primaryKey(),
  nome: text('nome').notNull(),
  sigla: text('sigla').notNull().unique(),
});


export const cidade = sqliteTable('cidade', {
  id: text('id').primaryKey(),
  nome: text('nome').notNull(),
  ufId: text('uf_id').notNull().references(() => uf.id),
});


export const regiao = sqliteTable('regiao', {
  id: text('id').primaryKey(),
  nome: text('nome').notNull(),
  cidadeId: text('cidade_id').notNull().references(() => cidade.id),
});


export const ufRelations = relations(uf, ({ many }) => ({
  cidades: many(cidade),
}));

export const cidadeRelations = relations(cidade, ({ one, many }) => ({
  uf: one(uf, { fields: [cidade.ufId], references: [uf.id] }),
  regioes: many(regiao),
}));

export const regiaoRelations = relations(regiao, ({ one }) => ({
  cidade: one(cidade, { fields: [regiao.cidadeId], references: [cidade.id] }),
}));