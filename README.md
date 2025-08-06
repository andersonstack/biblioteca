# 📚 Biblioteca - Front-End

Este repositório contém o código-fonte do **front-end** da aplicação **Biblioteca**, disponível em:

🔗 [https://biblioteca-neon.vercel.app/](https://biblioteca-neon.vercel.app/)

O projeto foi desenvolvido utilizando **TypeScript** e **Web Components**, com foco em desempenho e reuso de componentes.

---

## 🚀 Funcionamento

A aplicação minimiza o número de requisições ao banco de dados utilizando a `sessionStorage`.

- As requisições só são feitas quando a `sessionStorage` está vazia ou expirada.
- A validade dos dados em cache é controlada via `timestamp`, que define o tempo de expiração.

---

## 🖥️ Telas da Aplicação

### 🔐 Cadastro

- O usuário pode se cadastrar informando: nome, username e senha.
- O campo **username** é único por usuário.

### 🔑 Login

- O usuário autentica-se com seu **username** e **senha**.

### 🏠 Início

- Um carrossel exibe até 3 livros destacados, obtidos da `sessionStorage`.
- Abaixo, uma estante exibe todos os livros disponíveis.

### 📂 Meus Empréstimos

- Exibe os empréstimos ativos do usuário.
- Exibe também os empréstimos vencidos (data de devolução expirada).

### 🛠️ Visão do Administrador

- Usuários com perfil `admin` possuem acesso a uma área exclusiva (liberada via autenticação).
- Funcionalidades disponíveis:
  - ➕ Cadastrar livro
  - ✏️ Atualizar livro
  - 📤 Fazer empréstimo
  - 📥 Fazer devolução

---

## 📁 Estrutura do Projeto

. <br>
├── public <br>
│ ├── dist <br>
│ │ ├── components <br>
│ │ ├── interfaces <br>
│ │ ├── pages <br>
│ │ ├── service <br>
│ │ └── utils <br>
│ ├── images <br>
│ │ ├── banners <br>
│ │ └── icons <br>
│ └── styles <br>
└── src <br>
├── components <br>
├── interfaces <br>
├── pages <br>
├── service <br>
└── utils <br>

## 📦 Tecnologias

- [TypeScript](https://www.typescriptlang.org/)
- [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
- HTML, CSS
- `sessionStorage` para cache inteligente

## 🔗 Backend da Aplicação

A API utilizada por este front-end está disponível em:

👉 [andersonstack/biblioteca-api](https://github.com/andersonstack/biblioteca-api)

---

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE)

---
