import { db } from '../db/index.js';
import { regiao, cidade, uf } from '../db/schema.js';
import { eq } from 'drizzle-orm';
import { randomUUID } from 'crypto';

export async function listarRegioes() {
  return await db.select({
    id: regiao.id,
    nome: regiao.nome,
    cidadeId: regiao.cidadeId,
    cidadeNome: cidade.nome,
    ufSigla: uf.sigla,
  })
  .from(regiao)
  .leftJoin(cidade, eq(regiao.cidadeId, cidade.id))
  .leftJoin(uf, eq(cidade.ufId, uf.id));
}

export async function criarRegiao(nome: string, cidadeId: string) {
  const id = randomUUID();
  await db.insert(regiao).values({ id, nome, cidadeId });
  return id;
}

export async function atualizarRegiao(id: string, nome: string, cidadeId: string) {
  await db.update(regiao).set({ nome, cidadeId }).where(eq(regiao.id, id));
}

export async function deletarRegiao(id: string) {
  await db.delete(regiao).where(eq(regiao.id, id));
}

export async function buscarRegiaoPorNome(nome: string) {
  const resultado = await db.select().from(regiao).where(eq(regiao.nome, nome));
  return resultado[0];
}