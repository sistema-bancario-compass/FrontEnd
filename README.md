💻 Banking System Frontend (Angular 19)
Este é o frontend da aplicação Banking System, desenvolvido em Angular 19 para oferecer uma interface moderna e responsiva aos usuários do sistema bancário refatorado.

📦 Tecnologias e Ferramentas
Angular 19

TypeScript

SCSS

Angular CLI

JSON Server (para simulação de API local)

VS Code (recomendado)

📁 Estrutura do Projeto
bash
Copiar
Editar
frontend/
├── src/
│   ├── app/
│   │   ├── components/           # Componentes reutilizáveis
│   │   │   ├── menu/
│   │   │   └── ui/               # Botões, inputs, selects etc.
│   │   ├── core/services/        # Serviços para comunicação com o backend
│   │   ├── environment/          # Variáveis de ambiente
│   │   ├── pages/                # Telas principais do sistema
│   │   ├── app.component.*       # Componente raiz
│   │   ├── app.routes.ts         # Definições de rotas
│   │   └── app.config.ts         # Configuração da aplicação
│   ├── index.html
│   ├── main.ts
│   └── styles.scss
├── public/                       # Arquivos estáticos (favicon, logo)
├── angular.json                  # Configuração do Angular
├── db.json                       # Base de dados fake para testes (json-server)
├── package.json                  # Dependências e scripts
└── README.md
🚀 Como Executar
Pré-requisitos
Node.js 18+

Angular CLI 16+

(Opcional) JSON Server para simular uma API local

Passos
bash
Copiar
Editar
# Clone o repositório
git clone https://github.com/seu-usuario/frontend.git
cd frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
ng serve
A aplicação estará disponível em:
📍 http://localhost:4200

Simular API com JSON Server
bash
Copiar
Editar
npx json-server --watch db.json
A API estará disponível em:
📍 http://localhost:3000

🌐 Principais Páginas

Página	Caminho	Descrição
Login	/login	Tela de autenticação
Menu Principal	/menu	Tela inicial pós-login
Cadastro de Cliente	/cadastro-cliente	Formulário de novo cliente
Consulta de Cliente	/informacoes-cliente	Visualização de dados do cliente
Gerenciamento de Conta	/gerenciamento-conta	Operações bancárias
Relatório de Transações	/relatorios-transacoes	Visualização de extrato
🧩 Componentes Reutilizáveis
button – Botão genérico

input-primary – Input estilizado

select-primary – Select estilizado

back-button – Botão de navegação

menu – Componente de navegação lateral

🔗 Integração com Backend
Os serviços (core/services/*.service.ts) estão configurados para se comunicar com a API REST implementada no projeto backend. Atualize as URLs no environment.ts conforme necessário.

👥 Contribuidores
Projeto desenvolvido durante o Hackathon UOL Compass.

📄 Licença
Este projeto está sob a licença MIT.

