# Zelo - Marketplace de Serviços

O **Zelo** é uma plataforma de marketplace de serviços focada em conectar clientes (B2C) a prestadores de serviços autônomos. Desenvolvido como um projeto acadêmico do Grupo 3 , o Zelo visa simplificar a busca por profissionais qualificados e proporcionar visibilidade aos trabalhadores locais, promovendo eficiência e confiança através de uma vitrine digital intuitiva.

## Sobre o Projeto

O Zelo resolve a dificuldade de encontrar profissionais de confiança para serviços urgentes, eliminando a dependência de indicações incertas em grupos desestruturados.

**Diferencial:** Acesso prioritário via plano **Zelo Prime**, garantindo prontidão e profissionais de elite.
  
**Tecnologia:** Aplicação mobile desenvolvida com **React Native/Expo SDK 54**, utilizando **Drizzle ORM** para uma comunicação eficiente e tipada com o banco de dados.

## Stack Tecnológica

* **Framework:** [Expo SDK 54](https://docs.expo.dev/)
* **Linguagem:** TypeScript
* **ORM:** [Drizzle ORM](https://orm.drizzle.team/)

## Pré-requisitos

Certifique-se de ter instalado:

* Node.js (v18+)
* Expo CLI (`npm install -g expo-cli`)
* Gerenciador de pacotes (npm ou yarn)

## Como Executar

1. Clone o repositório:
```bash
git clone https://github.com/Lara-MS6/Grupo-3-Zelo

```


2. Instale as dependências:
```bash
npm install

```


3. Inicie o projeto:
```bash
npx expo start

```

Escaneie o QR Code com o aplicativo Expo Go no seu celular ou pressione w para abrir no navegador.
Estrutura do Projeto
plain
src/
├── app/
│   ├── (auth)/          # Telas de autenticação (login, registro)
│   ├── (tabs)/          # Telas principais com navegação por abas
│   │   ├── index.tsx    # Home
│   │   ├── search.tsx   # Busca
│   │   ├── orders.tsx   # Pedidos
│   │   ├── messages.tsx # Mensagens
│   │   └── profile.tsx  # Perfil
│   ├── chat/            # Tela de chat individual
│   ├── payment/         # Métodos de pagamento e adicionar cartão
│   ├── professional/    # Perfil do profissional e assinatura
│   ├── components/      # Componentes reutilizáveis
│   ├── db/              # Banco de dados / local storage
│   └── lib/             # Utilitários e helpers
Equipe
Table
Nome	Matrícula	Função
Alan Silva dos Santos	UC24200929	Desenvolvedor Full Stack
Brenda de Melo da Silva	UC24200378	Desenvolvedora Front-end
Bruna Borges Ferreira	UC24200644	Desenvolvedora Front-end
Lara Magalhães de Santana	UC24200620	Desenvolvedora Front-end
Mateus Nogueira Torres	UC24200334	Desenvolvedor Back-end
