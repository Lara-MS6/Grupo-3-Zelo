import readlineSync from 'readline-sync';
import * as ufModel from './models/uf.js';
import * as cidadeModel from './models/cidade.js';
import * as regiaoModel from './models/regiao.js';

function menuPrincipal() {
  console.log('\n=== SISTEMA DE CADASTRO ===');
  console.log('1. Gerenciar UFs');
  console.log('2. Gerenciar Cidades');
  console.log('3. Gerenciar Regiões');
  console.log('0. Sair');
  return readlineSync.question('Escolha: ');
}

function menuCRUD(entidade: string) {
  console.log(`\n=== ${entidade.toUpperCase()} ===`);
  console.log('1. Listar');
  console.log('2. Cadastrar');
  console.log('3. Editar');
  console.log('4. Excluir');
  console.log('0. Voltar');
  return readlineSync.question('Escolha: ');
}

async function gerenciarUFs() {
  while (true) {
    const opcao = menuCRUD('UFs');
    
    if (opcao === '1') {
      const ufs = await ufModel.listarUFs();
      console.log('\n--- Lista de UFs ---');
      ufs.forEach(u => console.log(`${u.sigla} - ${u.nome} (ID: ${u.id})`));
      
    } else if (opcao === '2') {
      const nome = readlineSync.question('Nome da UF: ');
      const sigla = readlineSync.question('Sigla: ').toUpperCase();
      await ufModel.criarUF(nome, sigla);
      console.log('UF cadastrada com sucesso!');
      
    } else if (opcao === '3') {
       
        const siglaBusca = readlineSync.question('Sigla da UF a editar: ').toUpperCase();
        const ufEncontrada = await ufModel.buscarUFPorSigla(siglaBusca);
        
        if (!ufEncontrada) {
            console.log('UF não encontrada!');
            continue; 
        }
        
        console.log(`Editando: ${ufEncontrada.sigla} - ${ufEncontrada.nome}`);
        
        const nome = readlineSync.question('Novo nome: ');
        const sigla = readlineSync.question('Nova sigla: ').toUpperCase();
        
        await ufModel.atualizarUF(ufEncontrada.id, nome, sigla);
        console.log('UF atualizada!');
      
    } else if (opcao === '4') {
  
        const siglaBusca = readlineSync.question('Sigla da UF a excluir: ').toUpperCase();
        const ufEncontrada = await ufModel.buscarUFPorSigla(siglaBusca);
        
        if (!ufEncontrada) {
            console.log('UF não encontrada!');
            continue; 
        }
        
        console.log(`Você vai excluir: ${ufEncontrada.sigla} - ${ufEncontrada.nome}`);
        const confirmacao = readlineSync.question('Tem certeza? (S/N): ').toUpperCase();
        
        if (confirmacao === 'S') {
            await ufModel.deletarUF(ufEncontrada.id);
            console.log('UF excluída!');
        } else {
            console.log('Exclusão cancelada.');
        }
    } else if (opcao === '0') {
      break;
    }
  }
}

async function gerenciarCidades() {
  while (true) {
    const opcao = menuCRUD('Cidades');
    
    if (opcao === '1') {
      const cidades = await cidadeModel.listarCidades();
      console.log('\n--- Lista de Cidades ---');
      cidades.forEach(c => 
        console.log(`${c.nome} - ${c.ufSigla}`)
      );
      
    } else if (opcao === '2') {
      const nome = readlineSync.question('Nome da Cidade: ');
      const ufId = readlineSync.question('Sigla da UF: ').toUpperCase();
     
      const ufEncontrada = await ufModel.buscarUFPorSigla(ufId);
      if (!ufEncontrada) {
        console.log('UF não encontrada!');
        continue;
      }
      await cidadeModel.criarCidade(nome, ufEncontrada.id);
      console.log('Cidade cadastrada!');
      
    } else if (opcao === '3') {
      const nomeBusca = readlineSync.question('Nome da Cidade a editar: ');
      const cidadeEncontrada = await cidadeModel.buscarCidadePorNome(nomeBusca);
      
      if (!cidadeEncontrada) {
        console.log('Cidade não encontrada!');
        continue;
      }
      
      console.log(`Editando: ${cidadeEncontrada.nome}`);
      const nome = readlineSync.question('Novo nome: ');
      const siglaUF = readlineSync.question('Nova sigla da UF: ').toUpperCase();
      
      const ufEncontrada = await ufModel.buscarUFPorSigla(siglaUF);
      if (!ufEncontrada) {
        console.log('UF não encontrada!');
        continue;
      }
      
      await cidadeModel.atualizarCidade(cidadeEncontrada.id, nome, ufEncontrada.id);
      console.log('Cidade atualizada!');
      
    } else if (opcao === '4') {
      const nomeBusca = readlineSync.question('Nome da Cidade a excluir: ');
      const cidadeEncontrada = await cidadeModel.buscarCidadePorNome(nomeBusca);
      
      if (!cidadeEncontrada) {
        console.log('Cidade não encontrada!');
        continue;
      }
      
      console.log(`Você vai excluir: ${cidadeEncontrada.nome}`);
      const confirmacao = readlineSync.question('Tem certeza? (S/N): ').toUpperCase();
      
      if (confirmacao === 'S') {
        await cidadeModel.deletarCidade(cidadeEncontrada.id);
        console.log('Cidade excluída!');
      } else {
        console.log('Exclusão cancelada.');
      }
      
    } else if (opcao === '0') {
      break;
    }
  }
}

async function gerenciarRegioes() {
  while (true) {
    const opcao = menuCRUD('Regiões');
    
    if (opcao === '1') {
      const regioes = await regiaoModel.listarRegioes();
      console.log('\n--- Lista de Regiões ---');
      regioes.forEach(r => 
        console.log(`${r.nome} - ${r.cidadeNome}/${r.ufSigla}`)
      );
      
    } else if (opcao === '2') {
      const nome = readlineSync.question('Nome da Região: ');
      const nomeCidade = readlineSync.question('Nome da Cidade: ');
     
      const cidadeEncontrada = await cidadeModel.buscarCidadePorNome(nomeCidade);
      if (!cidadeEncontrada) {
        console.log('Cidade não encontrada!');
        continue;
      }
      await regiaoModel.criarRegiao(nome, cidadeEncontrada.id);
      console.log('Região cadastrada!');
      
    } else if (opcao === '3') {
      const nomeBusca = readlineSync.question('Nome da Região a editar: ');
      const regiaoEncontrada = await regiaoModel.buscarRegiaoPorNome(nomeBusca);
      
      if (!regiaoEncontrada) {
        console.log('Região não encontrada!');
        continue;
      }
      
      console.log(`Editando: ${regiaoEncontrada.nome}`);
      const nome = readlineSync.question('Novo nome: ');
      const nomeCidade = readlineSync.question('Novo nome da Cidade: ');
      
      const cidadeEncontrada = await cidadeModel.buscarCidadePorNome(nomeCidade);
      if (!cidadeEncontrada) {
        console.log('Cidade não encontrada!');
        continue;
      }
      
      await regiaoModel.atualizarRegiao(regiaoEncontrada.id, nome, cidadeEncontrada.id);
      console.log('Região atualizada!');
      
    } else if (opcao === '4') {
      const nomeBusca = readlineSync.question('Nome da Região a excluir: ');
      const regiaoEncontrada = await regiaoModel.buscarRegiaoPorNome(nomeBusca);
      
      if (!regiaoEncontrada) {
        console.log('Região não encontrada!');
        continue;
      }
      
      console.log(`Você vai excluir: ${regiaoEncontrada.nome}`);
      const confirmacao = readlineSync.question('Tem certeza? (S/N): ').toUpperCase();
      
      if (confirmacao === 'S') {
        await regiaoModel.deletarRegiao(regiaoEncontrada.id);
        console.log('Região excluída!');
      } else {
        console.log('Exclusão cancelada.');
      }
      
    } else if (opcao === '0') {
      break;
    }
  }
}

async function main() {
  while (true) {
    const opcao = menuPrincipal();
    
    if (opcao === '1') await gerenciarUFs();
    else if (opcao === '2') await gerenciarCidades();
    else if (opcao === '3') await gerenciarRegioes();
    else if (opcao === '0') {
      console.log('Até logo!');
      break;
    }
  }
}

main();