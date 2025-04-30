
# 📋 BACKLOG Inicial (Sem Login)

## 🧾 Histórias de Usuário e Critérios de Aceite

| ID | História de Usuário | Critérios de Aceite |
|----|----------------------|----------------------|
| 1  | Como usuário, quero ver o menu principal | Tela com 3 opções: Cadastro de Cliente, Gerenciamento de Contas, Relatório de Transações |
| 2  | Como usuário, quero cadastrar novos clientes | Formulário para inserir dados de cliente e salvar |
| 3  | Como usuário, quero visualizar a lista de clientes | Lista paginada de clientes cadastrados |
| 4  | Como usuário, quero criar contas bancárias para clientes | Formulário para criar conta vinculada a cliente |
| 5  | Como usuário, quero ver a lista de contas | Listagem de contas bancárias |
| 6  | Como usuário, quero realizar operações em contas (depósito, saque, transferência) | Interfaces para operações financeiras nas contas |
| 7  | Como usuário, quero ver o relatório de todas as transações feitas | Tela de listagem e busca de transações |

# 🎯 ENDPOINTS de API Necessários (SEM LOGIN)

## 1. Clientes

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST   | /api/clients | Criar um novo cliente |
| GET    | /api/clients | Listar todos os clientes |
| GET    | /api/clients/{id} | Buscar um cliente por ID |
| PUT    | /api/clients/{id} | Atualizar informações do cliente |
| DELETE | /api/clients/{id} | Deletar um cliente |

## 2. Contas Bancárias

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST   | /api/accounts | Criar uma nova conta para um cliente |
| GET    | /api/accounts | Listar todas as contas |
| GET    | /api/accounts/{id} | Buscar uma conta específica |
| PUT    | /api/accounts/{id} | Atualizar dados da conta (tipo, status) |
| DELETE | /api/accounts/{id} | Deletar uma conta |

## 3. Operações em Conta

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST   | /api/accounts/{id}/deposit | Realizar depósito em uma conta |
| POST   | /api/accounts/{id}/withdraw | Realizar saque de uma conta |
| POST   | /api/accounts/transfer | Realizar transferência entre contas |

## 4. Relatórios de Transações

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET    | /api/transactions | Listar todas as transações (com filtros opcionais) |
| GET    | /api/transactions/{id} | Buscar uma transação específica |

# 🏗 Backend - Spring Boot (Java)

### ✅ Requisitos

- 1 projeto Java com Spring Boot
- Banco de dados H2 em memória configurado

### 📦 Entidades principais:

- Client
- Account
- Transaction

### 📡 Controladores REST:

- /clients
- /accounts
- /transactions

### 🔁 Operações:

- CRUD básico
- Depósito
- Saque
- Transferência

# 🖥 Frontend - Angular

### ✅ Telas necessárias:

- Menu Principal com botões para:
  - Cadastro/Listagem de Clientes
  - Gerenciamento de Contas
  - Relatório de Transações

### ✅ Funcionalidades:

- Telas de formulário (cadastro de cliente, conta, operações)
- Telas de listagem (clientes, contas, transações)
- Conexão com backend via HttpClient
