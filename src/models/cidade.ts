import { db } from '../db/index.js';
import { cidade, uf } from '../db/schema.js';
import { eq } from 'drizzle-orm';
import { randomUUID } from 'crypto';

export async function listarCidades() {
  return await db.select({
    id: cidade.id,
    nome: cidade.nome,
    ufId: cidade.ufId,
    ufNome: uf.nome,
    ufSigla: uf.sigla,
  })
  .from(cidade)
  .leftJoin(uf, eq(cidade.ufId, uf.id));
}

export async function criarCidade(nome: string, ufId: string) {
  const id = randomUUID();
  await db.insert(cidade).values({ id, nome, ufId });
  return id;
}

export async function atualizarCidade(id: string, nome: string, ufId: string) {
  await db.update(cidade).set({ nome, ufId }).where(eq(cidade.id, id));
}

export async function deletarCidade(id: string) {
  await db.delete(cidade).where(eq(cidade.id, id));
}

export async function buscarCidadePorNome(nome: string) {
  const resultado = await db.select().from(cidade).where(eq(cidade.nome, nome));
  return resultado[0];
}