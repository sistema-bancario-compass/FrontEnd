# 💻 Banking System Frontend (Angular 19)

Este projeto representa a interface web do sistema bancário refatorado, desenvolvido com Angular 19 e integrado à API REST do backend. Ele oferece uma experiência moderna, responsiva e segura para usuários bancários.

---

## 📦 Tecnologias e Ferramentas

- Angular 19  
- TypeScript  
- SCSS  
- Angular CLI  
- JSON Server (simulação de API local)  
- VS Code (recomendado)

---

## 📁 Estrutura do Projeto

```
frontend/
├── src/
│   ├── app/
│   │   ├── components/           # Componentes reutilizáveis
│   │   │   ├── menu/             # Navegação lateral
│   │   │   └── ui/               # Botões, inputs, selects
│   │   ├── core/services/        # Serviços de comunicação com backend
│   │   ├── environment/          # Configurações de ambiente
│   │   ├── pages/                # Telas principais da aplicação
│   │   ├── app.component.*       # Componente raiz
│   │   ├── app.routes.ts         # Definições de rotas
│   │   └── app.config.ts         # Configuração geral da aplicação
│   ├── index.html
│   ├── main.ts
│   └── styles.scss
├── public/                       # Arquivos estáticos (favicon, logos, etc.)
├── angular.json                  # Configurações do Angular
├── db.json                       # Base de dados fake (JSON Server)
├── package.json                  # Dependências e scripts npm
└── README.md
```

---

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+
- Angular CLI 16+
- (Opcional) JSON Server para testes com API local

### Passos

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/frontend.git
cd frontend

# Instale as dependências
npm install

# Inicie o servidor Angular
ng serve
```

A aplicação estará disponível em:  
📍 http://localhost:4200

---

## 🔌 Simular API com JSON Server (opcional)

```bash
npx json-server --watch db.json
```

A API estará disponível em:  
📍 http://localhost:3000

---

## 🌐 Principais Páginas

| Página                    | Caminho                   | Descrição                             |
|---------------------------|----------------------------|-----------------------------------------|
| Login                     | `/login`                  | Tela de autenticação                   |
| Menu Principal            | `/menu`                   | Tela inicial pós-login                 |
| Cadastro de Cliente       | `/cadastro-cliente`       | Formulário de registro de cliente      |
| Consulta de Cliente       | `/informacoes-cliente`    | Visualização de dados do cliente       |
| Gerenciamento de Conta    | `/gerenciamento-conta`    | Ações sobre contas bancárias           |
| Relatório de Transações   | `/relatorios-transacoes`  | Histórico de transações bancárias      |

---

## 🧩 Componentes Reutilizáveis

- button – Botão genérico
- input-primary – Campo de entrada estilizado
- select-primary – Menu de seleção
- back-button – Botão de navegação
- menu – Componente de navegação lateral

---

## 🔗 Integração com Backend

Os serviços localizados em core/services/*.service.ts consomem os endpoints REST disponibilizados pelo backend.

Configure a URL base no arquivo:

src/app/environment/environment.ts

```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080'
};
```

---

## 👥 Contribuidores

Projeto desenvolvido durante o Hackathon UOL Compass.

---

## 📄 Licença

Este projeto está sob a licença MIT. Consulte o arquivo LICENSE para mais detalhes.
