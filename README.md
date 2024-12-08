# TaskManager

Este é um sistema web para gerenciamento de tarefas, desenvolvido com **Spring Boot** no backend e **React** no frontend.

## Sobre o Projeto

O **TaskManager** é uma aplicação web que permite gerenciar tarefas de forma eficiente. Ele é dividido em duas partes principais:

- **Server**: Uma API REST desenvolvida com **Spring Boot**, que fornece todas as funcionalidades necessárias para realizar operações CRUD completas. Utiliza o banco de dados **PostgreSQL** para persistência dos dados.

- **Client**: O frontend da aplicação, desenvolvido com **TypeScript** e **React** usando o **ViteJS**. Além disso, foram utilizados os frameworks **PrimeReact** e **Bootstrap** para estilização e construção de componentes de interface.

---

## Requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina antes de iniciar o projeto:

- **Java 11**
- **Spring Boot 2.7.18**
- **PostgreSQL 16 ou superior**
- **Node.js 16 ou superior**
- **npm** ou **yarn**

---

## Configuração do Ambiente

### 1. Clone o Repositório

Faça o download do repositório para sua máquina local:

```bash
git clone https://github.com/Karinelucion/TaskManager.git
cd TaskManager
```

---

### 2. Instale as Dependências

#### Backend (Server):
Navegue para o diretório do backend e instale as dependências com o Maven:
```bash
cd server
mvn clean install
```

#### Frontend (Client):
Navegue para o diretório do frontend e instale as dependências com o npm:
```bash
cd client
npm install
```

---

### 3. Configure as Variáveis de Ambiente

1. **Copie o arquivo de exemplo do `.env` para criar sua configuração local:**

   ```bash
   cp .env.example .env
   ```

2. **Edite o arquivo `.env` com as configurações do seu ambiente.** Por exemplo:
   ```env
   SERVER_PORT=8025
   DB_URL=jdbc:postgresql://localhost:5432/taskmanager
   DB_USERNAME=username
   DB_PASSWORD=password
   DB_DRIVER=org.postgresql.Driver
   JPA_DIALECT=org.hibernate.dialect.PostgreSQLDialect
   DDL_AUTO=update
   ```

---

### 4. Configure o Banco de Dados

Certifique-se de criar o banco de dados no PostgreSQL com as credenciais definidas no arquivo `.env`. Este projeto **não possui _migrations_** no momento, então é necessário criar o banco manualmente.

1. Acesse o PostgreSQL no terminal:
   ```bash
   psql -U postgres
   ```

2. Crie o banco de dados:
   ```sql
   CREATE DATABASE taskmanager;
   ```
---

### 5. Execute o Projeto

#### Backend (Server):
1. No diretório `server`, inicie a aplicação Spring Boot:
   - Se estiver usando uma IDE como IntelliJ: Execute o arquivo `ServerApplication.java` (Shift + F10).
   - Ou execute pelo terminal:
     ```bash
     mvn spring-boot:run
     ```

2. A API estará disponível em:
   ```
   http://localhost:8025
   ```

#### Frontend (Client):
1. No diretório `client`, inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

2. O frontend estará disponível em:
   ```
   http://localhost:5173
   ```

---

## Estrutura do Projeto

Abaixo está uma visão geral dos diretórios principais:

```
TaskManager/
├── server/                  # Backend (API REST com Spring Boot)
│   ├── src/main/java        # Código-fonte do backend
│   ├── src/main/resources   # Arquivos de configuração (application.yml)
|   ├── .env.example         # Exemplo de configuração de variáveis de ambiente
│   └── pom.xml              # Configuração do Maven
├── client/                  # Frontend (React + ViteJS)
│   ├── src/                 # Código-fonte do frontend
│   └── package.json         # Dependências do frontend
└── README.md                # Documentação do projeto
```

---

## Funcionalidades Principais

- **Tarefas**:
  - Criar, listar, atualizar, excluir, pesquisar e filtrar tarefas.
---

## Endpoints da API

Aqui estão os endpoints disponíveis na API:

### **Tarefas**

#### **Listar todas as tarefas**
- **GET /tasks**  
  Retorna uma lista de todas as tarefas cadastradas.  

#### **Paginar tarefas**
- **GET /tasks/page**  
  Retorna uma página de tarefas com paginação e ordenação opcionais.  

  **Parâmetros de consulta:**
  - `page` (obrigatório): Número da página (inicia em 0).
  - `size` (obrigatório): Número de itens por página.
  - `order` (opcional): Campo de ordenação (ex.: `title` ou `status`).
  - `asc` (opcional): Direção da ordenação (`true` para ascendente ou `false` para descendente).

  **Exemplo de requisição:**
  ```
  GET /tasks/page?page=0&size=5&order=title&asc=true
  ```

#### **Obter uma tarefa por ID**
- **GET /tasks/{id}**  
  Retorna uma tarefa específica com base no ID fornecido.

#### **Criar uma nova tarefa**
- **POST /tasks**  
  Cria uma nova tarefa com os dados fornecidos no corpo da requisição.

#### **Atualizar uma tarefa existente**
- **PUT /tasks/{id}**  
  Atualiza uma tarefa existente com base no ID fornecido e nos dados enviados.

#### **Deletar uma tarefa**
- **DELETE /tasks/{id}**  
  Exclui uma tarefa com base no ID fornecido.

#### **Listar status possíveis**
- **GET /tasks/status**  
  Retorna uma lista de status disponíveis para as tarefas.
---
## Contato

Se você tiver dúvidas ou sugestões, entre em contato:
- **GitHub:** [github.com/Karinelucion](https://github.com/Karinelucion)
