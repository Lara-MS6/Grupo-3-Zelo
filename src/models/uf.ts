import { db } from '../db/index.js';
import { uf } from '../db/schema.js';
import { eq } from 'drizzle-orm';
import { randomUUID } from 'crypto';

export async function listarUFs() {
  return await db.select().from(uf);
}

export async function criarUF(nome: string, sigla: string) {
  const id = randomUUID();
  await db.insert(uf).values({ id, nome, sigla });
  return id;
}

export async function atualizarUF(id: string, nome: string, sigla: string) {
  await db.update(uf).set({ nome, sigla }).where(eq(uf.id, id));
}

export async function deletarUF(id: string) {
  await db.delete(uf).where(eq(uf.id, id));
}

export async function buscarUF(id: string) {
  const resultado = await db.select().from(uf).where(eq(uf.id, id));
  return resultado[0];
}

export async function buscarUFPorSigla(sigla: string) {
  const resultado = await db.select().from(uf).where(eq(uf.sigla, sigla.toUpperCase()));
  return resultado[0]; 
}